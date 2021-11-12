const Intern = require("../lib/Intern");

test('creates an intern object', () => {
    const intern = new Intern("cristian", 123, "cristianramirez0315@gmail.com", "palm lakes");
  
    expect(intern.name).toBe("cristian");
    expect(intern.id).toBe(123);
    expect(intern.email).toBe("cristianramirez0315@gmail.com");
    expect(intern.school).toBe("palm lakes");
  });

test ("intern role", () => {
    const intRole = "Intern";
    const intern = new Intern();
    expect(intern.getRole()).toBe(intRole);
});