# Overview

This will send daily texts from Ray Dalio's Principles to our subscribers. Also working on a Tim Draper version.
Decided to make this when Ray Dalio deprecated his daily Principles sent via sms.

## Contributing

Please email me at ksydaniel@gmail.com your number to be added to the list. Can't guarantee everyone will be added, as this uses Twilio API which I must pay for (0.7 cents per text). 

## API Reference

### POST /quotes

**Request**  
`Body`
```
{
    author: 'Dalio',
    quotes: []
}
```