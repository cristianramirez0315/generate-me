const Manager = require("../lib/Manager");

test('creates a manager object', () => {
    const manager = new Manager("cristian", 123, "cristianramirez0315@gmail.com", 451);
  
    expect(manager.name).toBe('cristian');
    expect(manager.id).toBe(123);
    expect(manager.email).toBe("cristianramirez0315@gmail.com");
    expect(manager.officeNumber).toBe(451);
  });

test ("manager role", () => {
    const manRole = "Manager";
    const manager = new Manager();
    expect(manager.getRole()).toBe(manRole);
});