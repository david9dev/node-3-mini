const allMessages = [];




module.exports = {

    getAllMessages: function(request, response)
    {
        response.status(200).send(allMessages);
    },
    createMessage: function(request, response)
    {
        const {userName, message} = request.body;
        const newMessage = 
        {
            userName,
            message
        }
        if(request.session.history)
        {
            request.session.history.push(newMessage);
        }
        else
        {
            request.session.history = [];
        }
        allMessages.push(newMessage);
         response.status(200).send(allMessages);
    },

    getHistory: function(request, response)
    {
        request.status(200).send(request.session.history);
    }


}