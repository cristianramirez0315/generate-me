const Engineer = require("../lib/Engineer");

test('creates an engineer object', () => {
    const engineer = new Engineer("cristian", 123, "cristianramirez0315@gmail.com", "cristianram");
  
    expect(engineer.name).toBe("cristian");
    expect(engineer.id).toBe(123);
    expect(engineer.email).toBe("cristianramirez0315@gmail.com");
    expect(engineer.github).toBe("cristianram");
  });

test ("engineer role", () => {
    const engRole = "Engineer";
    const engineer = new Engineer();
    expect(engineer.getRole()).toBe(engRole);
});