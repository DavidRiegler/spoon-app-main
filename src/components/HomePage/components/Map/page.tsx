import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { DivIcon } from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import MarkerCluster from 'react-leaflet-cluster';
import restaurants from './restaurantList';

interface Restaurant {
    id: number;
    name: string;
    description: string;
    averagePrice: string;
    imageUrl: string;
    location: {
      lat: number;
      lng: number;
    };
    rating: number;
}

interface CustomMarkerProps {
  averagePrice: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ averagePrice }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ 
        width: '40px', 
        height: '30px', 
        borderRadius: '20%', 
        backgroundColor: '#ffffff',
        padding: '2px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
    }}>
      <span style={{ fontSize: '12px', color: '#333' }}>{averagePrice}</span>
    </div>
  );
};

const createClusterIcon = (cluster: L.MarkerCluster): DivIcon => {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div style="background-color: rgba(124, 59, 124, 0.7); border-radius: 50%; padding: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                <span style="font-size: 16px; font-weight: bold;">${count}</span>
            </div>`,
    className: 'custom-cluster-icon',
    iconSize: L.point(40, 40),
  });
};

const Map: React.FC = () => {
  return (
    <div className="w-full h-[500px]">
      <MapContainer center={[51.90243472687174, -8.481868689693755]} zoom={13} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster 
          maxClusterRadius={60}
          iconCreateFunction={createClusterIcon} 
        >
          {restaurants.map((restaurant: Restaurant) => (
            <Marker 
              key={restaurant.id}
              position={[restaurant.location.lat, restaurant.location.lng]} 
              icon={L.divIcon({ 
                className: 'custom-icon', 
                html: ReactDOMServer.renderToString(<CustomMarker averagePrice={restaurant.averagePrice} />), 
                iconSize: [50, 50] 
              })}
            >
              <Popup>
                <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">{restaurant.name}</h2>
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        ★ {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{restaurant.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-semibold text-gray-900">Average Price: {restaurant.averagePrice}</div>
                      <button className="px-4 py-2 bg-lila text-white rounded-lg" onClick={() => window.location.href = `/restaurant/${restaurant.id}`} >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerCluster>
      </MapContainer>
    </div>
  );
}

export default Map;
