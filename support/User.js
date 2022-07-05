

class User {

    constructor(id, firstname, lastname, email, phone) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.fullname = this.getFullname()
        this.email = email
        this.phone = phone
    }

    getRandomUser(limit=8) {
        // Récupération d'un élément aléatoirement dans la limit choisi
        let randomElement = Math.floor(Math.random() * limit)
        cy.request({
            method: 'GET',
            url: 'https://dummyapi.io/data/v1/user?limit='+ limit,
            headers: {
                'app-id': '61f4248c9d9bb038eaf0c6c0'
              },
          }).then((resp) => {
            //expect(resp.status).to.eq(200)
            this.id = resp.body.data[randomElement].id
            /*cy.log(this.id)*/
            this.getUserFromId()
          })
      }

    getUserFromId() {
        cy.request({
            method: 'GET',
            url: 'https://dummyapi.io/data/v1/user/'+ this.id,
            headers: {
                'app-id': '61f4248c9d9bb038eaf0c6c0'
              },
          }).then((resp) => {
            this.firstname = resp.body.firstName
            this.lastname = resp.body.lastName
            this.getFullname()
            this.email = resp.body.email
            cy.log(this.fullname).as('fullname')
            cy.log(this.email).as('email')
          })
      }

      getFullname(){
        this.fullname = this.firstname + ' ' + this.lastname
      }
}
export default User