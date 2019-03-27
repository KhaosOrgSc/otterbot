# Otterbot

![alt text][logo]

[logo]: https://cdn.discordapp.com/avatars/558981317874810910/80ed1575585a561f95fbf7d645b5da66.png "Otterly Awesome Bot!"

#### Otterly Awesome Bot!

It's 2019 and we are still using the same old tiny boring emoji sizes since the dawn of the emoji. Don't you think it's time for some bigger and better emojis? Well we did and now OtterBot is here!

##### Well what does it do?

OtterBot allows you to link to your own hosted images and use them as emojis on Discord servers.

##### How to install this awesome bot.

1. Download the image for Docker.

```
docker pull khaosorg/otterbot
```

2. Get your Discord bot token and place it in a config.json file as so;

```javascript
{
  "token": "YourToken",
  "prefix":  "!o"
}
```

3. Map your newly created config.json file to the docker volume;

```
/path/to/your/config.json:/usr/app/src/config.json
```

4. Start your Docker container and enjoy the future of emojis!

##### Available Commands and more information.

##### Coming Soon™
