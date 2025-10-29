import gemini from "./llmModel.js";
import { createAgent } from "langchain";
import {createBrandTool, updateBrandTool, brandListTool,brandDropdownTool} from "./Tools/BrandTool.js"
import {createCategoryTool, updateCategoryTool, categoryDropdownTool} from "./Tools/CategoryTool.js"
import {customerDropdownTool, customerDetailsByNameTool} from "./Tools/CustomerTool.js"
import {supplierDropdownTool, supplierDetailsTool} from "./Tools/SupplierTool.js"
import {expenseAnalysisTool} from "./Tools/ExpenseTool.js"
import {purchaseAnalysisTool} from "./Tools/PurchaseTool.js"
import {salesAnalysisTool} from "./Tools/SalesTool.js"
import {returnAnalysisTool} from "./Tools/ReturnTool.js"

const agent = createAgent({
    model: gemini,
    tools:[
        createBrandTool, 
        updateBrandTool, 
        brandListTool,
        brandDropdownTool,
        createCategoryTool, 
        updateCategoryTool,
        categoryDropdownTool,
        customerDropdownTool,
        customerDetailsByNameTool,
        supplierDropdownTool,
        supplierDetailsTool,
        expenseAnalysisTool,
        purchaseAnalysisTool,
        salesAnalysisTool,
        returnAnalysisTool

    ],
    systemPrompt:`you are helpful IMS agent for name INVENTRA .
                 you can call the tool and reply human like language,
                 you will help friendly way and can summarize the data.
                 you can analyze the data and give suggestion.
                 Keep replies short and clear.
                 you can decide the tool which one need to call.for
                 example: if you want to create a new brand you can call the tool "CreateBrandTool",
                 you can use all tool according to need suppose you want to update you can use updateBrandTool,
                 ass a example when ask for brand list use brand drop down tool or if ask for category list use category drop down tool
                 otherwise you can chat normally friendly way. when client ask for last or first added for example
                 last brand you will use branddropdown tool and reply the last name in following list,if client ask for any category name 
                 availablable you can use category dropdown tool if available there or not and give reply. if ask for all category list you will
                 use category dropdown tool. you will use customerdropdown tool for list all customer and for find
                 available customer. for details customer you can use customerDetailsByNameTool. supplier tool for give all
                 supplier list and find the supplier for check available supplier for detail about supplier you can use supplierDetailsTool.
                 you can use expenseAnalysisTool for give suggestion and analysis of expense. purchaseAnalysisTool for give suggestion and analysis of purchase.
                 salesAnalysisTool for give suggestion and analysis of sales.
                 returnAnalysisTool for give suggestion and analysis of return. you can analysis and show how much
                 profit or lose going using by purchaseAnalysisTool, expenseAnalysisTool and salesAnalysisTool and comparing
                 all and suggest to client what to do next.
                
    
                `,
    
    
})

export default agent