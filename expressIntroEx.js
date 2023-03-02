const express = require('express');
const ExpressError = require('./expressError')

const app = express();

const NUMS = []
const EMP = []
const STR = [1, 2, 3, 'duh']

app.get('/mean', (req, res, next) => {
  if(!req.query.nums){
    throw new ExpressError("Numbers are required, separated by commas (?nums=...)", 400)
  }
  nums = req.query.nums.split(',')
  sum = 0
    for(n in nums){
      num = Number(nums[n])
      if(isNaN(num)) throw new ExpressError (`${nums[n]} is not a number`, 400)
      sum = sum + num
    }
    mean = (sum / nums.length)
    res.send({operation: "mean", value: mean})
})

app.get('/median', (req, res, next) => {
  if(!req.query.nums){
    throw new ExpressError("Numbers are required, separated by commas (?nums=...)", 400)
  }
  nums = req.query.nums.split(',')
  converted_nums = []
  for(n in nums){
    num = Number(nums[n])
    if(isNaN(num)) throw new ExpressError (`${nums[n]} is not a number`, 400)
    console.log(num)
    converted_nums.push(num)
  }
  converted_nums.sort(function(x,y){
    return x-y;
  })
  total_len = converted_nums.length
  len = total_len -1
  if(len % 2 === 1){
    median = ((converted_nums[Math.ceil(len/2)] + converted_nums[(Math.floor(len/2))]) / 2)
  } else if (len % 2 === 0) {
    median = converted_nums[((len)/2)]
  }
    res.send({operation: "median", value: median})
})

app.get('/mode', (req, res, next) =>{
  if(!req.query.nums){
    throw new ExpressError("Numbers are required, separated by commas (?nums=...)", 400)
  }
  nums = req.query.nums.split(',')
  numsCount = {}
  for(n = 0; n < nums.length; n++){
    num = Number(nums[n])
    if(isNaN(num)) throw new ExpressError (`${nums[n]} is not a number`, 400)
    if(numsCount[num]){
      numsCount[num] += 1;
    } else {
      numsCount[num] = 1;
    }
  }
    myval = Math.max(...Object.values(numsCount))
    mykey = Object.keys(numsCount).filter(function(key) {return numsCount[key] === myval})[0]
    console.log(mykey)
    res.send({operation: "mode", value:  mykey})
})

app.get('/mode/:nums', (req, res, next) =>{
  try{
    nums = STR
    count = {}
    if(nums.length === 0) throw new ExpressError("nums are required", 400)
    for(n = 0; n < nums.length; n++){
        num = nums[n]
        if(typeof(num) != "number") throw new ExpressError (`${num} is not a number`, 400)
        if(count[num]){
          count[num] += 1;
        } else {
          count[num] = 1;
        }
    }
    myval = Math.max(...Object.values(count))
    mykey = Object.keys(count).filter(function(key) {return count[key] === myval})[0]
    console.log(mykey)
    res.send({operation: "mode", value:  mykey})
    } catch(e) {
    next(e)
  }
})

app.use(function (err, req, res, next) { 
    let status = err.status || 500;
    let message = err.msg; 
  
    return res.status(status).json({
      error: { message, status }
    });
  });

app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
  