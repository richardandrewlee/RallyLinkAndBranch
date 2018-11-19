chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            showValues()
        }
    }
)

function showValues() {
    let data    = generateInputValues()
    let newHtml = generateHTML(data[0],data[1])
    presentDialogue(newHtml)
}

function presentDialogue(newHtml){
    var newDiv = $(document.createElement('div')); 
    newDiv.html(newHtml);
    newDiv.dialog();
}

function generateInputValues(){

    let url                  = window.location
    let numberDiv            = storyNumberContainer()
    let number               = numberDiv.text()
    let description          = descriptionValue(numberDiv)
    let formattedDescription = formatDescription(description)
    
    let Link             = '['+number+']('+url+') : '+description
    let gitHubBranchName = number+'_'+formattedDescription
    
    return [Link, gitHubBranchName]
}

function generateHTML(Link, gitHubBranchName){
    return 'Link: <input style="display:block; width:100%" value="'+Link+'"/> <br />Branch Name: <input style="display:block; width:100%"  value="'+gitHubBranchName+'"/>'
}

function storyNumberContainer() {
    return $('div').filter(function(){
        if ($(this).text().length < 10) {
            let DE = $(this).text().substring(0,2) == "DE"
            let US = $(this).text().substring(0,2) == "US"
            let F = $(this).text().substring(0,1) === "F"
            if (DE) {
                return DE
            } else if (F) {
                return F
            }
            return US
        }
    })
}

function formatDescription(description){
    return description.replace(/&/, "And").replace(/[^a-z0-9]/gmi, "_").replace(/_+/g, "_")
}

function descriptionValue(div) {
    return div.first().next("h1").find("input").val().replace(/"/g, "")
}