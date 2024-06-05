# NEST-SCHEDULING-APP

## Description

This is an application to create a scheduling or appointment

## Tech stack

* NestJS
* MongoDB
* Mongoose

## How to use

### Run Application

Run the application in dev mode using this command

```
npm run start:dev
```

## Endpoints
* [ GET /appointments/slots ](#get-appointments-slot)
* [ GET /appointments ](#get-appointments)
* [ POST /appointments ](#post-appointments)
<br/>

### GET /appointments/slots

This endpoint used to get available slot on certain date

#### Query Params

| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| date | string | Y | must be in yyyy-mm-dd format |

Example

```
{
    "date": "2024-06-05"
}
```

#### Response Body

##### 200 OK

Array of slot time that contains
| Field | Type | Description |
| ----- | ---- | -------------- |
| date | string | date of slot|
| time | string | time of slot|
| available_slots | string | number of slots available at certain date and time|

##### 400 BAD REQUEST

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />

### GET /appointments

This endpoint used to get appointments


#### Response Body

##### 200 OK

Array of appointments that contains
| Field | Type | Description |
| ----- | ---- | -------------- |
| _id | string | id of appointment |
| date | string | date of appointment |
| time | string | time of appointment |

##### 400 BAD REQUEST

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />

### POST /appointments

This endpoint used to create a new appointment

#### Body

| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| date | string | Y | date of appointment (must be in yyyy-mm-dd format) |
| time | string | Y | time of appointment (must be in HH:mm format) |

Example

```
{
    "date": "2024-06-20",
    "time": "10:00"
}
```

#### Response Body

##### 201 CREATED

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |
| appointment | appointment interface | contains appointment information (date, time) |

##### 400 BAD REQUEST

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />
