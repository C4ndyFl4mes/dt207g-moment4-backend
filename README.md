# Terraria Bosses / Konto - API
Det här är ett REST API skriven i JavaScript med Express för att hantera konton, autentisering och en skyddad resurs.
## Länk
Webbapplikationen som använder API:et: [repo](https://github.com/C4ndyFl4mes/dt207g_moment4_frontend) [URL](https://dt207g-moment4-frontend.netlify.app/terraria_bosses).
## Databas
API:et använder en NoSQL databas, MongoDB som består av en tabell för konton med följande fält:
```json
{
  "_id": "objectId",
  "username": "string",
  "password": "string",
  "role": "string",
  "registrationDate": "Date"
}
```
Lösenord hashas innan lagring. Role har ingen riktigt funktion.
## Användning
API:et har endast `GET` och `POST` metoder.
<table>
  <tr>
    <th>Metod</th>
    <th>Ändpunkt</th>
    <th>Body</th>
    <th>Headers</th>
    <th>Beskrivning</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/register</td>
    <td>"username", "password"</td>
    <td>Tom</td>
    <td>Registrerar en användare.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/login</td>
    <td>"username", "password"</td>
    <td>Tom</td>
    <td>Loggar in en användare.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/verify</td>
    <td>Tom</td>
    <td>"content-type": "application/xml", "authorization": "Bearer token"</td>
    <td>Verifierar en användare.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/terraria_bosses</td>
    <td>Tom</td>
    <td>"content-type": "application/xml", "authorization": "Bearer token"</td>
    <td>Hämtar terraria boss information.</td>
  </tr>
</table>
