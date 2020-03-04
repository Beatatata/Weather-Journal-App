const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=db93a58292b8db80793e420872f11ceb&units=imperial';

/* Global Variables */
// Create a new date instance dynamically with JS
// 返回时间
let date = new Date();
// let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();

document.getElementById("generate").addEventListener("click", performAction)
const allData = {};
// 全局变量
let userZip,content,data = 0;
// get userZip
function UserZip(userzipK){
    userZip = userzipK.value;
}
// get feelings
function Textarea(textareaK){    
    content = textareaK.value  
}

// 异步函数，使用fetch发送get请求，从openWeatherMap API 取回数据
function performAction(e){
    getTemp(baseURL, userZip, apiKey)
    .then(function(data){
      const a =postData('/add',{temp:data.main.temp,date:date,feeling:content});
      updateUI(a)
    })
}

const getTemp = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* 定义异步函数从应用端点请求数据 */
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
    allData = await request.json()
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    // console.log(data)
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),       
    });
   
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      }
}

const updateUI = async (a) =>  {
  try{
    const newData = await a;
    document.getElementById('date').innerHTML = "date：" + newData.date;
    document.getElementById('content').innerHTML = "feeling：" + newData.feel;
    document.getElementById("temp").innerHTML = "temp：" +  newData.temp;
  } catch(error){
    console.log("error",error)
  }
}