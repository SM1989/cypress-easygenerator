import { practicePage } from "../../pages/practicePage"
import testData from "../../fixtures/testData.json"
import 'cypress-iframe'

Cypress.on('uncaught:exception', (err, runnable) => { return false })
const practicePageObj = new practicePage();

describe('Practice Page Test Automation', ()=>{

    beforeEach('Launch URL',function(){
        practicePageObj.openURL();
    })

it('Home Button Validation',function(){
    practicePageObj.homeButtonNavigation()
    })

it('Dropdown Validation',function(){
    practicePageObj.selectDropdownValue(testData.dropdownValue)
    })

it('File Upload Validation',function(){
    practicePageObj.uploadImage(testData.imagePath)
    })

it('New Tab Validation',function(){
    practicePageObj.openNewTab(testData.redirectedURL)
    })

it('Alert Modal Validation',function(){
    cy.task('readFileWhichMayExist',testData.alertTextPath).then((data) => {
                practicePageObj.invokeAlertModal(data,testData.alertStrFirstPart,testData.alertStrSecondPart);
             })
    })

it('Confirmation Modal Validation',function(){
    cy.task('readFileWhichMayExist',testData.alertTextPath).then((data) => {
                practicePageObj.invokeConfirmationModal(data,testData.confirmStrFirstPart,testData.confirmStrSecondPart);
             })
    })

it('Show Hide Input Field Validation',function(){
    practicePageObj.showHideInput()
    })

it('Mouse Over Validation',function(){
    practicePageObj.mouseHover()
    })

it('Iframe Validation',function(){
    practicePageObj.handleIframe()
    })

it('Footer Links Validation',function(){
    practicePageObj.footerLinksValidation()
    })
})