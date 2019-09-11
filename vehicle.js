function vehicle()
{
this.acceleration=createVector(0,0);
this.current=createVector(random(600),random(600));
this.velocity=createVector(0,-2);
this.maxspeed=random(1,10);
this.maxforce=random(0.1,1);
this.health=100;
this.maxrepulsion=random(0.1,1);
var castename=["eldian","marlian"];
this.caste=castename[Math.floor(Math.random()*(2))];
}
vehicle.prototype.move=function()
{
this.velocity.add(this.acceleration);
this.velocity.limit(this.maxspeed);
this.current.add(this.velocity);
this.acceleration.mult(0);

}
vehicle.prototype.apply=function(force)
{
this.acceleration.add(force);

}
vehicle.prototype.seek=function(target)
{

var desired=p5.Vector.sub(target,this.current);

var steer=p5.Vector.sub(desired,this.velocity);
steer.limit(this.maxforce);
this.apply(steer);
}
vehicle.prototype.aging=function()
{
this.health--;
}

vehicle.prototype.runforlife=function(danger)
{
var desired=p5.Vector.sub(danger,this.current);
desired.x=-desired.x;
desired.y=-desired.y
var steer=p5.Vector.sub(desired,this.velocity);
steer.limit(this.maxrepulsion);
this.apply(steer);

}