// write tests here
describe("Quotes App",()=>{
    //使得每次test可以刷新页面，因为每个测试都是独立的，不被其他的test影响
    beforeEach(()=>{
        cy.visit("http://localhost:1234 ")
    })
    //input element 中寻找 name===text的element
    const textInput=()=>cy.get("input[name=text]")
    const authorInput=()=>cy.get('input[name=author]')
    const foobarInput=()=>cy.get('input[name=foobar]')
    const submitBtn=()=>cy.get(`button[id="submitBtn"]`)
    const cancelBtn = () => cy.get(`button[id="cancelBtn"]`)

    it ("sanity check to make sure tests work",()=>{
        expect(1+2).to.equal(3)//===
        expect(2+2).not.equal(5)
        expect({}).not.equal({})
        expect({}).to.eql({}) // ==

    })
    
    it ("the proper elements are showing",()=>{
        textInput().should("exist")
        authorInput().should("exist")
        foobarInput().should("not.exist")
        submitBtn().should("exist")
        cancelBtn().should("exist")
        cy.contains('Submit Quote').should('exist') //需要注意大小写
        cy.contains(/submit quote/i).should('exist')//忽略大小写
    })


    describe("Filling out the inputs and cancelling",()=>{
        it("can navigate to the site",()=>{
            cy.url().should('include','localhost')
        })
        it("submit botton starts out disabled",()=>{
            submitBtn().should("be.disabled")
        })
        it("can type in the inputs",()=>{
            textInput().should("have.value","")
                       .type("CSS rules")
                       .should("have.value","CSS rules")
            
            authorInput().should("have.value","")
                        .type("CR")
                        .should("have.value", "CR")
        
         })

         it ("the submit button enables when both inputs are filled out",()=>{
            textInput().type("a")
            authorInput().type("b")
            submitBtn().should("not.be.disabled")
         })

         it("the cancel button can reset the inputs and disable the submit button",()=>{
             textInput().type("casey")
             authorInput().type("this is fun")
             cancelBtn().click()
             textInput().should("have.value","")
             authorInput().should("have.value", "")
             submitBtn().should('be.disabled')


         })


    })

    describe("Adding a new quote",()=>{
        it("can submit and delete a new qoute",()=>{
            textInput().type("CSS rulez")
            authorInput().type("CSS")
            submitBtn().click()

            cy.contains("CSS rulez").siblings("button:nth-of-type(2)").click()
            cy.contains("CSS rulez").should("not.exist")

        })
        //另一种方法
        it("variation of can submit a new quote",()=>{
            cy.contains("CSS rulez").should("not.exist")
            textInput().type("CSS rulez")
            authorInput().type("Casey")
            submitBtn().click()
            cy.contains("CSS rulez")
            cy.contains("Casey")
            cy.contains("CSS rulez").next().next().click()
            cy.contains("CSS rulez").should("not.exist")
        })
    })

    describe("Editing an existing quote",()=>{
        it("can edit a qoute",()=>{
            textInput().type("hello")
            authorInput().type("love")
            submitBtn().click()
            cy.contains("hello").siblings("button:nth-of-type(1)").click()
            textInput().should("have.value","hello")
            authorInput().should("have.value","love")
            textInput().type(" hhh")
            authorInput().type(" www")
            submitBtn().click()
            cy.contains("hello hhh (love www)")
            //hit the delete button
            cy.contains("hello hhh (love www)").next().next().click()
            cy.contains("hello hhh (love www)").should("not.exist")
        })
    })




})