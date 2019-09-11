function predator()
{
this.size=30;
this.acceleration=createVector(0,0);
this.current=createVector(random(600),random(600));
this.velocity=createVector(0,-2);
this.maxspeed=2;
this.maxforce=0.4;
this.health=100;

}
predator.prototype.move=function()
{
this.velocity.add(this.acceleration);
this.velocity.limit(this.maxspeed);
this.current.add(this.velocity);
this.acceleration.mult(0);

}
predator.prototype.apply=function(force)
{
this.acceleration.add(force);

}
predator.prototype.seek=function(target)
{
var desired=p5.Vector.sub(target,this.current);

var steer=p5.Vector.sub(desired,this.velocity);
steer.limit(this.maxforce);
this.apply(steer);
}
