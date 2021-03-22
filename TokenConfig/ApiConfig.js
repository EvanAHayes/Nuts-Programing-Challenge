class config{

  //Test to get token 
    createJWTToken(token) {
        return 'Bearer ' + token   
    }

    RequestToken(){
        axios.post("https://auth.commercetools.co/oauth/token?grant_type=client_credentials&scope=view_products:nuts-custom-demo-1", {}, {
        auth:{
           username: 'BZaa-av5L6RmZKlPgZaGNkea',
           password: 'jchbf_Q5zRWCaEg4TCB4m9cLIioPiml0'
        }
       }).then(response => {
        return 'Bearer ' + response.data.access_token
       });       
   }
}