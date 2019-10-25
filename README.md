# Boston University - CS 411

This repository contains the work on a group project for Boston University's
CS 411 course.

## Usage

set up local server by

    $ python -m SimpleHTTPServer 8888
  
ps: dont change to other port, because the callback url is added to the spotify whitelist.

Open a brower (I use Safari) paste the link address.

## Known bugs

1. I hided the body section before login. There can be some mechanics to show the it after login

<code>body > div.fullview.searchboxview.<strong>ng-hide</strong></code>

2. User name is not displayed because the user.js file hasnt be implemented

3. Planned to make the login button to be green, but havent wrote the css file.



## Proposal

Spotitunes: Transfer your playlists between Spotify and Apple Music.

Spotitunes leverages the Spotify and Apple Music APIs to allow users to select any public playlist from your account in one service and duplicate it in the other. The user pastes a link to their public playlist into Spotitunes and it will then automagically recreate it in the other music service.

APIs used:

Spotify
Apple Music



## Team Pugs

Members:
- Nikolai Vazquez
- Yu Liu, a.k.a. "Felix"
- Mingzhe Huang, a.k.a "Peter"
- Ishmael Perez, a.k.a. "Ish" (like "fish")
