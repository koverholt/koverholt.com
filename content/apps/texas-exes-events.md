---
title: "Texas Exes Events"
---

<link rel="stylesheet" type="text/css" href="/css/texas-exes-events.css">
<script src="/js/texas-exes-events.js"></script>

<br>

<img src="/images/texas-exes-highland-lakes-chapter.png">

<div id="app">

  <p>
    <h5>
      Texas Exes Highland Lakes Chapter: Event Registrations and Donations
    </h5>
  </p>

  The following ticket purchases or donations have occurred in the last 60 days:

  <div>
    <table id="events">
      <tr>
        <th>Event or Donation</th>
        <th>Count</th>
      </tr>
      <tr v-for="(item, key, index) in event_counts">
        <td>{{ key }}</td>
        <td>{{ item }}</td>
        </tr>
    </table>
  </div>

  This report was generated on {{ fetch_date }} US Central Time.

</div>
