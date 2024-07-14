import 'cypress-iframe'

export class practicePage {

    webLocators = {
        homeButton : 'a > .btn',
        dropdown : '#dropdown-class-example',
        openTabButton : '#opentab',
        alertTextBox : '#name',
        uploadFileButton : '.image-upload-wrapper > input',
        uploadedImage : 'img',
        openNewTabButton : '#opentab',
        alertButton : '#alertbtn',
        confirmButton : '#confirmbtn',
        hideButton : "#hide-textbox",
        showButton : '#show-textbox',
        hideShowTextBox : '#displayed-text',
        mouseHoverButton : '.hover-container > .btn',
        mouseOverTop : '[href="#top"]',
        mouseOverReload : '[href=""]',
        iframe : '#courses-iframe',
        iframeItem : '#app',
        footerFacebook : 'ul > :nth-child(1) > a',
        footerTwitter : 'ul > :nth-child(2) > a',
        footerYoutube : ':nth-child(3) > a'
    }

    openURL(){
        cy.visit(Cypress.env('URL'))
        cy.url().should('include','/task')
    }

    homeButtonNavigation(){
        cy.get(this.webLocators.homeButton).click()
        cy.url().should('include','easygenerator')
        cy.go('back')
        cy.url().should('include','/task')
    }

    selectDropdownValue(val){
        cy.get("select").select(val)
        cy.get("select option:selected").invoke("text").should("eq",val)
    }

    uploadImage(filePath){
        cy.get(this.webLocators.uploadFileButton).selectFile(filePath)
        cy.get(this.webLocators.uploadedImage).should('be.visible')
    }

    openNewTab(redirectedURL){
        cy.window().then(function(win){
            cy.spy(win,'open').as('redirect')
        })
        cy.get('#opentab').click()
        cy.get('@redirect').should('be.calledWith',redirectedURL,'_blank')
    }

    invokeAlertModal(val,alertFirstPart,alertSecondPart){
        cy.log(alertFirstPart+val+alertSecondPart)
        cy.get(this.webLocators.alertTextBox).type(val)
        cy.get(this.webLocators.alertButton).click()
        cy.on('window:alert', (str) => {
            expect(str).to.be.eq(alertFirstPart+val+alertSecondPart)
          })
    }

    invokeConfirmationModal(val,confirmFirstPart,confirmSecondPart){
        cy.get(this.webLocators.alertTextBox).type(val)
        cy.get(this.webLocators.confirmButton).click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(confirmFirstPart+val+confirmSecondPart)
          })
    }

    showHideInput(){
        cy.get(this.webLocators.hideShowTextBox).should('be.visible')
        cy.get(this.webLocators.hideButton).click()
        cy.get(this.webLocators.hideShowTextBox).should('not.be.visible')
        cy.get(this.webLocators.showButton).click()
        cy.get(this.webLocators.hideShowTextBox).should('be.visible')
    }

    mouseHover(){
        cy.get(this.webLocators.mouseHoverButton).trigger('mouseover')
        cy.get(this.webLocators.mouseOverTop).should('be.visible')
        cy.get(this.webLocators.mouseOverTop).click()
        cy.get(this.webLocators.mouseHoverButton).scrollIntoView()
        cy.get(this.webLocators.mouseHoverButton).trigger('mouseover')
        cy.get(this.webLocators.mouseOverReload).click()
    }

    handleIframe(){
        //3rd Party library "cypress-iframe" is used to interact with Iframe in the application under test
        cy.frameLoaded(this.webLocators.iframe)
        cy.iframe().find(this.webLocators.iframeItem).should('be.visible')
    }

    footerLinksValidation(){
        cy.get(this.webLocators.footerFacebook).scrollIntoView()
        cy.get(this.webLocators.footerFacebook).invoke("removeAttr","target").click()
        cy.url().should('include','facebook')
        cy.go('back')
        cy.get(this.webLocators.footerYoutube).invoke("removeAttr","target").click()
        cy.url().should('include','youtube')
        cy.go('back')
        cy.get(this.webLocators.footerTwitter).invoke("removeAttr","target").click()
        cy.url().should('include','x')
        cy.go('back')
    }
}