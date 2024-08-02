---
title: ServiceNow Research
categories: 
date: 2024-07-28
tags: []
---
https://docs.servicenow.com/bundle/washingtondc-api-reference/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html

```
(function processInboundEmail(email, action) {
    // Create a new incident record
    var incident = new GlideRecord('incident');
    incident.initialize();
    incident.short_description = email.subject;
    incident.description = email.body_text;
    incident.caller_id.setDisplayValue(email.from);
    incident.insert();
})(email, action);

```


# ServiceNow created 2 records via inbound actions with same record number but different sys_ids
https://www.servicenow.com/community/developer-forum/servicenow-created-2-records-via-inbound-actions-with-same/td-p/2385278

```js
(function runAction(/*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {
    // Retrieves user account.
    try {
        var contactDetails;
        // Get Assignment group based on support mailbox
        var groupInfo = this.getAssignmentGroup(email.direct);
        var assignmentGroupObj = new GlideRecord('sys_user_group');
        assignmentGroupObj.get('name', groupInfo);

        // Check for valid user details
        if (sys_email.user_id) {
            contactDetails = this.checkUser(sys_email.user_id.email.toString(), groupInfo);
            if (contactDetails) {
                var userAccount = contactDetails.account;
                var contactSysId = contactDetails.sysId;
            }
        }

        // Recognised user
        if (contactDetails && sys_email.user_id) {
            current.account = userAccount;
            current.contact = contactSysId;
            current.state = 10;
            current.description = "Email From: " + sys_email.user_id.email + "\n\n" + "Email Body: " + sys_email.body_text;
            current.comments = "Email From: " + sys_email.user_id.email + "\n\n" + "Email Body: " + sys_email.body_text;
        } else if (sys_email.user_id) {
            // Unrecognised valid user
            current.state = 1;
            current.comments = "Email From: " + sys_email.user_id.email + "\n\n" + "Email Body: " + sys_email.body_text;
            current.description = "Email From: " + sys_email.user_id.email + "\n\n" + "Email Body: " + sys_email.body_text;
        } else {
            // Unrecognised user
            current.state = 1;
            current.comments = "Email From: " + sys_email.user + "\n\n" + "Email Body: " + sys_email.body_text;
            current.description = "Email From: " + sys_email.user + "\n\n" + "Email Body: " + sys_email.body_text;
        }
        current.assignment_group = assignmentGroupObj.sys_id;
        current.short_description = sys_email.subject;
        current.priority = 3;
        current.category = 1;
        current.contact_type = 'email';
        current.correlation_display = "xxx:" + sys_email.direct;
        current.insert();
    } catch (error) {
        gs.error("email: " + error);
    }

})(current, event, email, logger, classifier);

function checkUser(email, assignmentGroup) {
    var result = '';
    var contactObj = new GlideRecord('customer_contact');
    contactObj.addQuery('email', email);
    contactObj.query();
    while (contactObj.next()) {
        var contactAccount = contactObj.account.sys_id.toString();
        var osp = new global.xxxOSPUtils().getOSPNameFromCustomer(contactAccount);
        if (osp == assignmentGroup) {
            var contactDetails = {};
            contactDetails.account = contactAccount;
            contactDetails.sysId = contactObj.sys_id.toString();
            result = contactDetails;
            break;
        }
    }
    return result;
}

function getAssignmentGroup(mailBoxId) {
    var mappingObj = new GlideRecord('x_teeag_payload_pr_integration_column_data_mapping');
    mappingObj.addQuery('integration_name', 'xxxx Email');
    mappingObj.addQuery('source', 'xxxx');
    mappingObj.addQuery('source_value', mailBoxId);
    mappingObj.query();
    if (mappingObj.next()) {
        return mappingObj.target_value.toString();
    }
}

```


---
https://www.servicenow.com/community/developer-forum/inbound-mail-action-to-create-an-record/m-p/1973572
you need to configure your mailbox to redirect/forward emails to ServiceNow mailbox. i.e.  instancename@service-now.com

Once you receive an email, please configure the inbound action to create a ticket in ServiceNow.

https://docs.servicenow.com/bundle/washingtondc-servicenow-platform/page/administer/general/concept/capabilities-bundle-landingpage.html


# # How to create an incident using email
https://www.servicenow.com/community/itsm-forum/how-to-create-an-incident-using-email/m-p/753328




---

## Other

```JS
(function processInboundEmail(email, action) {
    // Function to create a new incident
    function createNewIncident(email) {
        var incident = new GlideRecord('incident');
        incident.initialize();
        incident.short_description = email.subject;
        incident.description = email.body_text;
        incident.caller_id.setDisplayValue(email.from);
        incident.contact_type = 'email';
        incident.insert();
        // Store the incident number in the correlation_id field to use it in replies
        incident.correlation_id = incident.number;
        incident.update();
    }

    // Function to update an existing incident
    function updateIncident(incident, email) {
        incident.comments = "Email Reply From: " + email.from + "\n\n" + email.body_text;
        incident.update();
    }

    // Check if the email is a reply by looking at the 'In-Reply-To' or 'References' header
    var replyTo = email.headers['In-Reply-To'] || email.headers['References'];

    if (replyTo) {
        // Try to find the incident using the correlation_id field
        var incident = new GlideRecord('incident');
        incident.addQuery('correlation_id', replyTo);
        incident.query();

        if (incident.next()) {
            // If the incident is found, update it with the email body
            updateIncident(incident, email);
        } else {
            // If the incident is not found, create a new incident
            createNewIncident(email);
        }
    } else {
        // If there is no 'In-Reply-To' or 'References' header, create a new incident
        createNewIncident(email);
    }
})(email, action);

```