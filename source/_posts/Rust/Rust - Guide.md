---
title: Rust Variables
categories:
  - Rust
date: 2024-09-08
tags:
  - Rust
---
|                        | Types                                      | Literals                       |
| ---------------------- | ------------------------------------------ | ------------------------------ |
| Signed integers        | `i8`, `i16`, `i32`, `i64`, `i128`, `isize` | `-10`, `0`, `1_000`, `123_i64` |
| Unsigned integers      | `u8`, `u16`, `u32`, `u64`, `u128`, `usize` | `0`, `123`, `10_u16`           |
| Floating point numbers | `f32`, `f64`                               | `3.14`, `-10.0e20`, `2_f32`    |
| Unicode scalar values  | `char`                                     | `'a'`, `'α'`, `'∞'`            |
| Booleans               | `bool`                                     | `true`, `false`                |

- `iN`, `uN`, and `fN` are _N_ bits wide,
- `isize` and `usize` are the width of a pointer,
- `char` is 32 bits wide,
- `bool` is 8 bits wide.

### **Bit Widths**

### **Signed Integer Types (`iN`)**

- **Signed integers** use one bit to represent the sign (positive or negative), and the remaining bits for the value (magnitude). They can represent both negative and positive numbers.

|Type|Bit Width|Range|
|---|---|---|
|`i8`|8 bits|-128 to 127|
|`i16`|16 bits|-32,768 to 32,767|
|`i32`|32 bits|-2,147,483,648 to 2,147,483,647|
|`i64`|64 bits|-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807|
|`i128`|128 bits|Extremely large range|
|`isize`|Depends on the platform (32 bits on 32-bit systems, 64 bits on 64-bit systems)||

### **Unsigned Integer Types (`uN`)**

- **Unsigned integers** only represent non-negative numbers, and since there’s no need for a sign bit, all bits are used for the magnitude.

|Type|Bit Width|Range|
|---|---|---|
|`u8`|8 bits|0 to 255|
|`u16`|16 bits|0 to 65,535|
|`u32`|32 bits|0 to 4,294,967,295|
|`u64`|64 bits|0 to 18,446,744,073,709,551,615|
|`u128`|128 bits|Extremely large range|
|`usize`|Depends on the platform (32 bits on 32-bit systems, 64 bits on 64-bit systems)|
### Rust's Approach to Integer Overflow

Rust has several methods to handle integer overflow:

1. **Checked Arithmetic** (default in debug mode): When an overflow is detected, it panics (as seen here).
    
2. **Wrapping Arithmetic**: The result wraps around, mimicking how arithmetic works in C. For example, `i16::MAX + 1` will wrap around to `i16::MIN`.
    
    rust
    
    Copy code
    
    `(a * b).wrapping_add(b * c).wrapping_add(c * a);`
    
3. **Saturating Arithmetic**: The result is clamped to the maximum or minimum value if it overflows.
    
    rust
    
    Copy code
    
    `(a * b).saturating_add(b * c).saturating_add(c * a);`
    
4. **Overflowing Arithmetic**: Returns a tuple with the result and a Boolean indicating whether an overflow occurred.
    
    rust
    
    Copy code
    
    `let (result, overflowed) = (a * b).overflowing_add(b * c).overflowing_add(c * a);`
    
5. **Carrying Arithmetic**: Similar to overflowing, but it’s useful for multi-word arithmetic (for handling large numbers across multiple registers).