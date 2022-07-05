import User from '../support/User'

// élément du DOM
// Formulaire contact
let fullnameInput = '.wpcf7-form > :nth-child(2) > .wpcf7-form-control-wrap > .wpcf7-form-control'
let fullnameResponse = '.wpcf7-form > :nth-child(2) > .wpcf7-form-control-wrap > .wpcf7-not-valid-tip' 
let emailInput = ':nth-child(1) > .wpcf7-form-control-wrap > .wpcf7-form-control'
let emailResponse = ':nth-child(1) > .wpcf7-form-control-wrap > .wpcf7-not-valid-tip'
let phoneInput = '.wpcf7-inline-wrapper > :nth-child(2) > .wpcf7-form-control-wrap > .wpcf7-form-control'
let phoneResponse = '.wpcf7-inline-wrapper > :nth-child(2) > .wpcf7-form-control-wrap > .wpcf7-not-valid-tip'
let descriptionTextarea = ':nth-child(4) > .wpcf7-form-control-wrap > .wpcf7-form-control'
let projectPriceList = ':nth-child(5) > .wpcf7-form-control-wrap > .wpcf7-form-control'
let projectPriceElement = ['500 - 3.000 €','3.000 - 10.000 €', '10.000 - 15.000 €', '15.000 € +']

let formcontactButton = ':nth-child(6) > .wpcf7-form-control'
let formcontactResponse = '.wpcf7-response-output'



describe('fakeYourBusiness_contact', () => {

  before(() => {
    cy.visit('https://www.fakeyourbusiness.com/pages/contact-creative/')
  })
  it('verification formulaire vide', () => {
    let verifForm = 'Validation errors occurred. Please confirm the fields and submit it again.'
    
    cy.get(formcontactButton).click().as('validateForm')
    cy.get(formcontactResponse).should('contain.text',verifForm)
  })

  it('Vérifier les messages d erreur des champs required', () => {
    let verifString = 'Please fill the required field.'
    
    //fullname
    cy.get(fullnameResponse).should('contain.text',verifString)
    //email
    cy.get(emailResponse).should('contain.text',verifString)
    
    //phone
    cy.get(phoneResponse).should('contain.text',verifString)

  })

  afterEach(() => {
    cy.get(emailInput).clear()
    cy.get(emailInput).clear()
    cy.get(phoneInput).clear()
    cy.get(descriptionTextarea).clear()
    cy.get(projectPriceList).select(0)
  })

  it("Vérifier le message d'erreur si l'email est invalid", () => {
    let verifString = 'Email address seems invalid.'
    //email
    cy.get(emailInput).type('error@')
    cy.get(emailInput).tab()
    cy.get(emailResponse).should('contain.text',verifString)
    
  })

  it("Remplir le formulaire correctement", () => {
    // Récupération de l'utilisateur
    let user = new User()
    user.getRandomUser()
    cy.log(user.id)


    let errorForm = 'Failed to send your message. Please try later or contact the administrator by another method.'
    //fullname
    cy.get(fullnameInput).type('Jean Michel')

    //email
    cy.get(emailInput).type('etienne.brunet@pstestware.fr')
    
    //phone
    cy.get(phoneInput).type('0612345678')

    //Description
    cy.get(descriptionTextarea).type('Lorem ipsum')

    // Récupération d'un élément au hasard dans la liste des éléments présents
    let selectElement = projectPriceElement[Math.floor(Math.random() * (projectPriceElement.length-1))]
    cy.get(projectPriceList).select(selectElement)
    // Validation du formulaire
    cy.get(formcontactButton).click().as('validateForm')
    cy.get(formcontactResponse).should('not.contain',errorForm)

  })


})