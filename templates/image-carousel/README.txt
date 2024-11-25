Build an image carousel

Create an image carousel. 
It should contain arrows on each side to advance the image forward or backward. 
It should automatically move forward every 5 seconds. 
It should contain the little navigation circles at the bottom that indicate which slide you are on (and they should be clickable to advance to that particular slide).

Don’t spend too much time worrying about getting your images to display at the correct size – it’s more important to get the carousel rotating.

This one is a little more involved than the previous task, so think about how you would set up the different elements within the site.
Set up a very wide div which will contain the individual “slides” of each image. 
  By appropriately positioning that div inside a container div (which acts like a picture frame), you can choose which slide is visible at any given time.
Once you have the slider positioned properly, build functions for “next” and “previous” which will advance to the next or previous slide accordingly. 
  The transition doesn’t need to be smooth or animated. Only make it switch to the correct slide.
Set up arrow buttons which activate those functions and play with cycling through the images.
Add in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. 
  Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are. 
  Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.
Add a timeout which advances the slides every 5 seconds.
Play around with your slideshow!