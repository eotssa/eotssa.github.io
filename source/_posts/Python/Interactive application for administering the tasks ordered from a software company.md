---
title: Interactive application for administering the tasks ordered from a software company
categories:
  - Python
date: 2024-02-24 23:11:42
tags:
  - Python
---
## Order Book Application

Create an interactive application for administering the tasks ordered from a software company. The implementation should handle both flawless input and erroneous input.

**Application:**

```
commands:
0 exit
1 add order
2 list finished tasks
3 list unfinished tasks
4 mark task as finished
5 programmers
6 status of programmer

command: 1
description: program the next facebook
programmer and workload estimate: jonah 1000
added!

command: 1
description: program mobile app for workload accounting
programmer and workload estimate: eric 25
added!

command: 1
description: program an app for music theory revision
programmer and workload estimate: nina 12
added!

command: 1
description: program the next twitter
programmer and workload estimate: jonah 55
added!

command: 2
no finished tasks

command: 3
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

command: 4
id: 2
marked as finished

command: 4
id: 4
marked as finished

command: 2
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

command: 3
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

command: 5
jonah
eric
nina

command: 6
programmer: jonah
tasks: finished 2 not finished 1, hours: done 55 scheduled 1000
```

Handling Errors
```
command: 1
description: program mobile app for workload accounting
programmer and workload estimate: eric xxx
erroneous input

command: 1
description: program mobile app for workload accounting
programmer and workload estimate: eric
erroneous input

command: 4
id: 1000000
erroneous input

command: 4
id: XXXX
erroneous input

command: 6
programmer: unknownprogrammer
erroneous input
```

```python
# Write your solution here
# If you use the classes made in the previous exercise, copy them here


# Previous 
class Task:
    id_counter = 0 # class-level variable, keeps track of how many Task classes are created 

    def __init__(self, description: str = "", programmer: str = "", workload: int = 0) -> None:
        self.description = description
        self.programmer = programmer
        self.workload = workload
        
        # default status is False / NOT FINISHED 
        self.finished = False
        
        Task.id_counter += 1
        # class variable 
        self.id = Task.id_counter

    def is_finished(self):
        return self.finished
            
    def mark_finished(self):
        self.finished = True
    
    def __str__(self):
            status = "FINISHED" if self.finished else "NOT FINISHED"
            return f"{self.id}: {self.description} ({self.workload} hours), programmer {self.programmer} {status}"

class OrderBook:
    def __init__(self) -> None:
        self._all_orders = []

    def add_order(self, description, programmer, workload):
        task_obj = Task(description, programmer, workload)
        self._all_orders.append(task_obj)

    def all_orders(self):
        return self._all_orders
    
    # creates a set, which is converted to a list 
    def programmers(self):
        return list(set(order.programmer for order in self._all_orders))

    # takes id of matching Task obj and marks relevant task as finished 
    def mark_finished(self, id: int):
        for order in self._all_orders:
            if order.id == id: # unsure about order.id because Task.id is class variable? 
                order.mark_finished() # Task obj method ``
                return 
        raise ValueError("NO ID MATCHED FOR TASK")
    
    def finished_orders(self):
        return [order for order in self._all_orders if order.is_finished()] 
    
    def unfinished_orders(self):
        return [order for order in self._all_orders if not order.is_finished()] 
   
    def status_of_programmer(self, programmer: str) -> tuple:
        if any(order.programmer == programmer for order in self._all_orders): 
            task_done = sum([1 for order in self._all_orders if order.programmer == programmer and order.is_finished() == True])
            task_undone = sum([1 for order in self._all_orders if order.programmer == programmer and order.is_finished() == False])
            num_done_hours = sum([order.workload for order in self._all_orders if order.programmer == programmer and order.is_finished()])
            num_undone_hours = sum([order.workload for order in self._all_orders if order.programmer == programmer and not order.is_finished()])
    
            return task_done, task_undone, num_done_hours, num_undone_hours
        
        raise ValueError("STATUS OF PROGRAMMER ERROR")


class OrderBookApplication:
    def __init__(self) -> None:
        self.__orders = OrderBook()

    def help(self): 
        print("commands: ")
        print("1 add order")
        print("2 list finished tasks")
        print("3 list unfinished tasks")
        print("4 mark task as finished")
        print("5 programmers")
        print("6 status of programmer")
        print("0 exit")

    def add_order(self):
        description = input("description: ")
        prog_and_estimate = input("programmer and workload estimate: ")

        # [0] = programmer, [1] = estimate hours/workload 
        parts = prog_and_estimate.split(" ")
        
        try: 
            programmer_name = parts[0]
            workload = int(parts[1]) # feel like there should be more...but this also covers the case for lack thereof input  
        except:
            print("erroneous input")
            return

        self.__orders.add_order(description, programmer_name, workload)
        print("added!") # probably not here 
                                                                

    def list_finished_tasks(self):
        if len(self.__orders.finished_orders()) == 0:
            print("no finished tasks")
        for item in self.__orders.finished_orders():
            print(item)

    def list_unfinished_tasks(self):
        this_list = self.__orders.unfinished_orders()

        for item in this_list:
            print(item)

    def mark_task_as_finish(self):

        # checkes for in-range ID, and if input is a type error 
        try: 
            val = int(input("id: "))
            if val <= Task.id_counter:
                self.__orders.mark_finished(val)
                print("marked as finished")

            else:
                print("erroneous input")
        except:
            print("erroneous input")
            return
        

    def programmers(self):
        # classes aren't being inherited here... 
        # for programmer in super().programmers():
        #     print(programmer)

        for programmer in self.__orders.programmers():
            print(programmer)

    def status_of_programmer(self):
        name = input("name: ")

        if not name in self.__orders.programmers():
            print("erroneous input")
            return
        
        parts = self.__orders.status_of_programmer(name) # returns a tuple (task_done, task_undone, num_done_hours, num_undone_hours)
        print(f"tasks: finished {parts[0]} not finished {parts[1]}, hours: done {parts[2]} scheduled {parts[3]}")

    def execute(self):
        self.help() # runs interface format 
        while True:
            print("")
            command = input("command: ")
            if command == "0":
                break
            elif command == "1":
                self.add_order()
            elif command == "2":
                self.list_finished_tasks()
            elif command == "3": 
                self.list_unfinished_tasks()
            elif command == "4":
                self.mark_task_as_finish()
            elif command == "5":
                self.programmers()
            elif command == "6":
                self.status_of_programmer()
            else:
                self.help()

application = OrderBookApplication()
application.execute()
```