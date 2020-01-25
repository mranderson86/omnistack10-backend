function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = function getDistanceFromLatLonInKm(centerCoordinates,pointCoordinates) {
    const radius = 6371;

    const { latitude: lat1,longitude: lon1 } = centerCoordinates;
    const { latitude: lat2,longitude: lon2 } = pointCoordinates;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin( dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin( dLon / 2);

    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = radius * center;
    //const distance = center;
    //console.log(distance);

    return distance;
}

// module.exports = function getDistanceFromLatLonInKm(position1, position2) {
//     "use strict";
//     var deg2rad = function (deg) { return deg * (Math.PI / 180); },
//         R = 6371,
//         dLat = deg2rad(position2.lat - position1.lat),
//         dLng = deg2rad(position2.lng - position1.lng),
//         a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
//             + Math.cos(deg2rad(position1.lat))
//             * Math.cos(deg2rad(position1.lat))
//             * Math.sin(dLng / 2) * Math.sin(dLng / 2),
//         c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         const distance = (R * c *1000).toFixed();

//         console.log(distance);

//         return distance;
// }