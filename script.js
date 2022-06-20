
async function fetchData() {
    // document.getElementById("result").style.display = "none";
    loader()
    const lang = document.getElementsByTagName("select")[0].value
    const a = document.getElementById("editor").value;
    const input = document.getElementById("input").value;
    const code = a.split('"').join('\"');
    const x = {"language":lang,"code":code,"input":input,"save":false}
    const response = await fetch("https://codejudge.geeksforgeeks.org/submit-request", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(x)
    });

    const submition = await response.json();

    const url = `https://codejudge.geeksforgeeks.org/get-status/${submition.id}`
    await getResult(url)
   
    
}

async function getResult(url) {
    const res = await fetch(url);
    const result = await res.json();
    if(result.status == "in-queue"){
        getResult(url);
    }
    else
    {
        if(result.compResult == "S")
        {
        
            showData(result);
        }
        else if(result.compResult == "F")
        {
            errorMessage(result);
        }
        else
        {
            console.log(result);
        }
        


    }   
}


function showData(result)
{
    document.getElementById("result").innerHTML = `<h3></h3>
    <br />
    <p></p>
    <span></span>
    <span></span><br />`
    document.getElementById("result").style.display = "block";
    document.getElementsByTagName("p")[0].style.fontSize = "18px"
    document.getElementsByTagName("p")[0].style.backgroundColor = "#67C23A"
    document.getElementsByTagName("h3")[0].innerText = 'Output :'
    document.getElementsByTagName("p")[0].innerText = result.output
    document.getElementsByTagName("span")[0].innerText = `Memory : ${result.memory}`
    document.getElementsByTagName("span")[1].innerText = `Time : ${result.time}`

}
function errorMessage(result)
{
    document.getElementById("result").innerHTML = `<h3></h3>
    <br />
    <p></p>
    <span></span>
    <span></span><br />`
    document.getElementById("result").style.display = "block";
    document.getElementsByTagName("p")[0].style.backgroundColor = "#f44336"
    document.getElementsByTagName("h3")[0].innerText = 'Error Message :'
    document.getElementsByTagName("p")[0].innerText = result.cmpError
    document.getElementsByTagName("span")[0].innerText = ''
    document.getElementsByTagName("span")[1].innerText = ''


}
function loader()
{
    document.getElementById("result").innerHTML = `<button
      id="loading"
      class="btn btn-success position-absolute top-50 start-50 translate-middle"
      type="button"
      disabled
    >
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Compiling...
    </button>`
  document.getElementById("result").style.display = "block";
}
