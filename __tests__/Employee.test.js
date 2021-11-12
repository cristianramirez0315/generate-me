const Employee = require("../lib/Employee");

test('creates an employee object', () => {
    const employee = new Employee("cristian", 123, "cristianramirez0315@gmail.com");
  
    expect(employee.name).toBe("cristian");
    expect(employee.id).toBe(123);
    expect(employee.email).toBe("cristianramirez0315@gmail.com");
  });

test ("employee role", () => {
    const empRole = "Employee";
    const employee = new Employee();
    expect(employee.getRole()).toBe(empRole);
});