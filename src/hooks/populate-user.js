// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, method, result, params } = context;

    // // Ensure contacts is an array. If it's a single contact, wrap it into an array
    // const contacts = method === 'find' ? result.data : [result];

    // // Fetch user object from each contact's createdBy
    // await Promise.all(
    //   contacts.map(async contact => {
    //     contact.user = await app
    //       .service('users')
    //       .get(contact.createdBy, params);
    //   })
    // );
   
    const addUser = async contact => {
      const user = await app.service('users').get(contact.userId, params);
      return {
        ...contact,
        user
      };
    };
    
    
    
    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      // Otherwise just update the single result
      context.result = await addUser(result);
      console.log(result);
    }
    
    return context;
  };
};
