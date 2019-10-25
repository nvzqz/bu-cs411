# Boston University - CS 411

This repository contains the work on a group project for Boston University's
CS 411 course.

## Usage

    $ install npm

    $ bower install anguler-route

set up local server by

    $ python -m SimpleHTTPServer 8888
  
ps: dont change to other port, because the callback url is added to the spotify whitelist.

## Known bugs

1. after login, we are redirected back to index.html, but I don't know why the body is hidden

<code>body > div.fullview.searchboxview.<strong>ng-hide</strong></code>

2. once you searched something, you cannot get back to previous page, need to add a button return



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
