
describe('ORANGE HRM DEMO WEBSITE TEST SUITE', () => {

  before('Launch the application', () => {

    cy.clearCookies();

  })

  it('Logging into the Orange HRM demo application', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('img[alt="company-branding"]').should('be.visible') //Validate the image
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.log('Logged in successfully')

    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard') //Validate the title of the page
    cy.log('Dashboard is loaded')

    //Click on PIM to add a new emplyee
    //cy.contains('PIM').click()
    cy.get(':nth-child(2) > .oxd-main-menu-item > .oxd-text').click()
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'PIM') //Validate the title of the page
    cy.get('button[class="oxd-button oxd-button--medium oxd-button--secondary"]').click() //Click on Add button to add a new employee

    cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title') //validate the tab title
    cy.get('input[placeholder="First Name"]').type('Khadar')
    cy.get('input[placeholder="Middle Name"]').type('Basha')
    cy.get('input[placeholder="Last Name"]').type('Shaik')

    //Can use any of the below methods to upload a picture
    cy.get('.employee-image').attachFile('MyPic_TI.jpeg')
    //cy.get('.employee-image').should('exist')
    //cy.uploadFile('MyPic_TI.jpeg', 'image/jpeg', '.employee-image');
    //cy.fixture('MyPic_TI.jpeg').as('imageData');

    cy.get('#app div.oxd-layout div.oxd-layout-context form div.orangehrm-employee-container div.orangehrm-employee-image div:nth-child(2) img').should('exist')

    //Create Login Details
    cy.get('.oxd-switch-input').click()
    const randomUserName = Math.random().toString(36).substring(5) //Will return 5 random alphabets
    cy.contains('Username').parent().siblings().type(randomUserName) //Username
    cy.contains('Password').parent().siblings().type('Basha@0000') //Password
    cy.contains('Confirm Password').parent().siblings().type('Basha@0000') //Confirm Password

    cy.get('button[type="submit"]').should('exist').click() //Click on Save
    cy.get('.oxd-toast-content').should('be.visible').and('contain.text', 'Success')
    cy.contains('Personal Details', { timeout: 50000 }).should('be.visible')

    cy.get('li[class="oxd-topbar-body-nav-tab --visited"] a[class="oxd-topbar-body-nav-tab-item"]').should('exist').click() //Click on Employee list

    //Search with the username and validate whether the user is present in the employee list
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Khadar Basha')
    cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('have.length', '1')

    cy.get('.oxd-userdropdown-name').click() //Click on Profile dropdown to navigate to logout
    cy.contains('Logout').should('be.visible').click() //Not clicking on logout button as we are getting an uncaught expression which we cannot handle
    cy.get('img[alt="company-branding"]').should('be.visible') //Validate Orange HRM Image after logging out
  })
})