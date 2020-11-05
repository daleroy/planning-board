import Task from './Task'

test('constructor',()=>{
    let task = new Task({}, {});
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
});