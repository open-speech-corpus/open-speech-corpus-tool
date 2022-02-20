
![Logo](https://raw.githubusercontent.com/open-speech-corpus/tool/main/extras/image-banner.png?token=GHSAT0AAAAAABJAAEDHXBLXAIBPURLQZQNMYQSENEQ)


# Open Speech Corpus (BETA)

Open Speech Corpus is a voice sample collection and validation tool that helps researchers and engineers to collect and validate voice samples through crowdsourcing.

## Tech Stack

**Client:** React, MUI

**Database:** Firebase



## Features

- Responsive UI
- Easy Voice Collection and Validation
- Seperate Admin Dashboard
- Easy to Deploy


## Installation Guide

### 1. Change the Firebase Credentials

- Go to `src/Providers/firebase` and Change to your firebase Credentials.

#### Once Changed, Deploy your website.


### 2. Accessing Admin Panel

 - Once your website is deployed online, register a new user at `yoursite/Register`.
 - Go to the Firebase Firestore and in `userPermissions` update permission to `ADMIN` 
 - Now goto `yoursite/Login` and login to your admin panel.

## Credits

The tool is part of project submitted at Department of Computer Science and Engineering, Baba Ghulam Shah Badshah University, J&K

- Rukhsana Thaker
- Syed Vikas Shabir
- Safoora Mir
- Owais Bin Amin