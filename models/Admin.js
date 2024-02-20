import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  adminType: {
    type: String,
    enum: ['Super', 'Regular'],
    default: 'Regular'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin', // Reference to another Admin who created this Admin
    required: function() { return this.adminType === 'Regular'; } // This field is required for Regular admins, assuming only Super admins can create admins
  },

  // Additional fields can be added as needed
});

const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin;
