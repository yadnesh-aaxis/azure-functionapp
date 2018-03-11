# Readme for functionapps

#Languages
1) Javascript
2) Java
3) C#
4) F#
5) PHP
few more such as bash, powershell etc are in experimental mode still.

#Trigger
1) http
2) Timer
3) Webhook
4) Cosmos DB Trigger
5) Blob Trigger
6) Queue Trigger such as azure storage queue
7) Event hub
few more..



# Set environment variables
In addition to already set environment variables for azure add additional variables below

##**this is where code will be stored**
`set STORAGE_ACCOUNT_NAME=yadstorageaccount1`

##**this is like my sub-domain for my functions**
`set FUNCTION_APP_NAME=yadFunctions`

# Create FunctionApp
#**Step to create the storage (optional if one already exists use that)**
`az storage account create --name %STORAGE_ACCOUNT_NAME% --location %LOCATION% --resource-group %RESOURCE_GROUP% --sku Standard_LRS`


#**Step to create functionapp**
#this is the umbrella for all functions created its called functionapp
#Discuss about various plans such as consumption plan or app Service Plan which is based hardallocation
`az functionapp  create -g %RESOURCE_GROUP%  -n %FUNCTION_APP_NAME% -s %STORAGE_ACCOUNT_NAME% --consumption-plan-location %LOCATION%`



##host.json
Allows for configuration of host runtime and trigger behaviors.
Applies to all functions under this app.
{
    "http": {
        "routePrefix": "api",
        "maxOutstandingRequests": 20,
        "maxConcurrentRequests": 10,
        "dynamicThrottlesEnabled": false
    }
}

#Deploy First Function sample1 (not yet working)
az functionapp deployment source config --repo-url https://github.com/yadnesh-aaxis/azure.git --branch master --repository-type github --resource-group %RESOURCE_GROUP% --name %FUNCTION_APP_NAME%