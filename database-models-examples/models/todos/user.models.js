import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  { // firt object schems defined
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true } // second object  timeestamp
);

export const User = mongoose.model('User', userSchema);


// what kind of data will be stored 

// what kind of field we will store 


// Moon Modeler tool for data modeling and database design. It allows you to create, visualize, and manage your database schemas in a user-friendly interface. You can define entities, relationships, and attributes, and then generate the corresponding database scripts for various database management systems.
// and other Data Model Models like 


// CodeSandbox is an online code editor and prototyping tool that allows developers to create, share, and collaborate on web applications in real-time. It supports various front-end and back-end technologies, enabling users to build full-stack applications directly in the browser.
// CodeSpace is a cloud-based development environment that provides developers with a virtual workspace to write, test, and deploy code. It offers features like version control, collaboration tools, and integration with popular development frameworks and libraries, making it easier for teams to work together on software projects.
// StackBlitz is an online IDE that allows developers to create, edit, and deploy web applications directly from their browser. It supports various front-end frameworks and libraries, providing a seamless development experience without the need for local setup or configuration.
//  to write code you can i choose stackblits for this code 