let entity=[];
let food=[];
let titan=[];
function setup()
{
createCanvas(800,600);
for(let i=0;i<100;i++)
{
entity[i]=new vehicle;
}
for(i=0;i<200;i++)
{
food[i]=createVector(random(width),random(height));
}
setInterval(newfood,1000);
setInterval(makingCopy,1000*10)
setpredator();
}

function draw()
{
background(225);
wall();
fill(255);
stroke(0);
strokeWeight(1);
for(let i=0;i<entity.length;i++)
{
//fill(225);
//ellipse(entity[i].current.x,entity[i].current.y,50,50);
if(entity[i].caste=="eldian")
fill(255);
if(entity[i].caste=="marlian")
fill(0);
ellipse(entity[i].current.x,entity[i].current.y,20,20);
entity[i].move();
for(let j=0;j<food.length;j++)
{
//console.log(food[j].x<entity[i].x+200 && food[j].x>entity[i].current.x-200);
if((food[j].x<entity[i].current.x+50 && food[j].x>entity[i].current.x-50) || (food[j].y<entity[i].current.y+50 && food[j].y>entity[i].current.y-50))
{
entity[i].seek(food[j]);
break;
}
else{
if(entity[i].current.x<0 || entity[i].current.x>width || entity[i].current.y<0 || entity[i].current.y>height)
{
var mid=createVector(width/2,height/2);
entity[i].seek(mid);
}
}
}
}
time();
showfood();
eatfood();
run();
drawpredator();
eatpeople();
rebelation();
}


function time()
{
for(let i=0;i<entity.length;i++)
{
entity[i].aging();
if(entity[i].health<0)
entity.splice(i,1);

}
}
function eatfood()
{
for(let i=0;i<entity.length;i++)
{
for(let j=0;j<food.length;j++){
if((food[j].x<entity[i].current.x+5 && food[j].x>entity[i].current.x-5) &&(food[j].y<entity[i].current.y+5 && food[j].y>entity[i].current.y-5))
{
food.splice(j,1);
entity[i].health+=100;
}
}
}
}

function newfood()
{

food.push(createVector(random(width),random(height)));

}





function showfood()
{
for(let i=0;i<food.length;i++)
{
fill(0,255,0);
ellipse(food[i].x,food[i].y,5,5);

}

}

function makingCopy()
{
let temp=entity.length;
for(let i=0;i<temp;i++)
{
let chance=random(1);
console.log(chance);
if(chance<0.1)
{
entity[entity.length]=new vehicle;
}
}
}
function run()
{
for(let i=0;i<titan.length;i++)
{
for(let j=0;j<entity.length;j++)
{
if((entity[j].current.x<titan[i].current.x+50 && entity[j].current.x>titan[i].current.x-50) || (entity[j].current.y<titan[i].current.y+50 && entity[j].current.y>titan[i].current.y-50))
{
entity[j].runforlife(titan[i].current);
break;
}
}
}
}

function setpredator()
{
for(let i=0;i<0;i++)
{
titan[i]=new predator;
}
}
function drawpredator()
{
for(let i=0;i<titan.length;i++)
{
fill(255,0,0);
ellipse(titan[i].current.x,titan[i].current.y,titan[i].size,titan[i].size);
titan[i].move();
for(let j=0;j<entity.length;j++)
{
//console.log(food[j].x<entity[i].x+200 && food[j].x>entity[i].current.x-200);
if((entity[j].current.x<titan[i].current.x+50 && entity[j].current.x>titan[i].current.x-50) && (entity[j].current.y<titan[i].current.y+50 && entity[j].current.y>titan[i].current.y-50))
{
titan[i].seek(entity[j].current);
break;
}
if(titan[i].current.x<0 || titan[i].current.x>width || titan[i].current.y<0 || titan[i].current.y>height)
{
var mid=createVector(width/2,height/2);
titan[i].seek(mid);
}
}
}
}
function eatpeople()
{
for(let i=0;i<titan.length;i++)
{
for(let j=0;j<entity.length;j++){
if((entity[j].current.x<titan[i].current.x+(titan[i].size/4 )&& entity[j].current.x>titan[i].current.x-(titan[i].size/4)) &&(entity[j].current.y<titan[i].current.y+(titan[i].size/4 )&& entity[j].current.y>titan[i].current.y-(titan[i].size/4)))
{
entity.splice(j,1);
titan[i].size+=5;
}
}
}
}

function wall()
{
fill(255,100,0);
ellipse(width/2,height/2,400,400);
fill(225);
ellipse(width/2,height/2,300,300,);


}

function rebelation()
{
let count=0;
for(let i=0;i<entity.length;i++)
{
count=0;
for(let j=0;j<entity.length;j++)
{
if((entity[j].current.x<entity[i].current.x+50 && entity[j].current.x>entity[i].current.x-50) && (entity[j].current.y<entity[i].current.y+50 && entity[j].current.y>entity[i].current.y-50))
{
if(entity[i].caste=="eldian")
{
if(entity[j].caste=="marlian")
{
count++;
}
}
}
}
if(count>7)
{console.log(count);
if(random(1)<0.1)
{
titan.push(new predator);
lightining(entity[i].current.x,entity[i].current.y);
titan[0].current=entity[i].current;
entity.splice(i,1);

}

}
}
}
function lightining(x,y)
{
stroke(0,255,0);
strokeWeight(10);
line(0,0,x,y);
line(width,0,x,y);
line(0,height,x,y);
line(width,height,x,y);

}