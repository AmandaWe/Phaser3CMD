/**
 * This demo demonstrates the most basic physics using sprites:
 *   A ball bounces on the floor.
 * 
 * In this demo there are no loaded graphics.
 * Instead of sprites, shape object are used. Shape objects can be used for simple ... shapes (in this case a circle and a rectangle).
 * https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Shape.html
 * 
 * In update() Phaser is told to check collisions between the circle and the floor.
 *   If such a collision takes place, Phaser makes things behave as in the 'real world'
 *
 * The ball, by the way, also is told to bounce with the edges of the world. This way it cannot leave the screen permanently.
 */

var ball;
var floor;

/**
 * Create the graphic objects and initialise physics
 *
 * Because the anchor point of the objects are not in the top-left,
 *    the bodies for the objects need to be offset manually (here using setCircle() and setSize())
 */
function create() {

    // create a graphics object and draw a circle
    ball = this.add.circle(400,100, 30, 0xff0000);
    
    // enable physics for the ball and set some physics properties
    // instead of a bounding box, it is told to use a circle for collision detection
    this.physics.world.enable(ball);
    ball.body.setCircle(30, 0, 0);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.y = 1;

    // create a graphics object and draw a rectangle
    floor = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.height - 40, 800, 40, 0x00ff00);

    // enable physics for the floor and set some physics properties
    // this floor cannot move and is not under the influence of gravity
    this.physics.world.enable(floor);
    floor.body.allowGravity = false;
    floor.body.immovable = true;
}

/**
 * Let Phaser do the collision check between ball and floor
 * Phaser deals with the collision according to physics laws and settings (like gravity and bouncyness)
 */
function update() {
    this.physics.collide(ball, floor);
}


/**
 * The configuration of the game
 * Here used to also display some info on the physics system in an overlay
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0xff00ff,
            debugStaticBodyColor: 0xffffff
        },
    },
    scene: {
        create: create,
        update: update,
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
