const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
first_name: {
    type: String,
    required: true
},
last_name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
position: String,
salary: Number,
date_of_joining: {
    type: Date,
    default: Date.now()
},
department: String,
created_at: {
    type: Date,
    default: Date.now()
},
updated_at: {
    type: Date,
    default: Date.now()
}
});
employeeSchema.pre("findOneAndUpdate", function(next) {
    this.set({ updated_at: Date.now() });
    next();
})
const Employee = mongoose.model('Employee', employeeSchema);


module.exports = Employee;