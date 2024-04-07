"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/authContext';

import Nav from "../components/nav/nav.js";
import Footer from "../components/footer/footer.js";

import "./admin.css"

const Admin = () => {
  const router = useRouter();
  const { authData } = useAuth();

  const [isUsers, setIsUsers] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [isStats, setIsStats] = useState(false);
  const [stats, setStats] = useState([]);
  const [selectedStatId, setSelectedStatId] = useState(null);
  const [editedStat, setEditedStat] = useState('');
  const [images, setImages] = useState([]);
  const [deleteMessages, setDeleteMessages] = useState([]);
  useEffect(() => {
    if (!authData.isAuthenticated) {
      alert("NOT LOGGED IN");
      router.push('/login')
    } else {
      console.log("LOGGED IN")
    }
  }, [authData.isAuthenticated, router]);

  const handleUsersClick = () => {
    setIsUsers(true);
    setIsGallery(false);
    setIsStats(false);
    setIsBlog(false);
  };

  const handleGalleryClick = () => {
    setIsUsers(false);
    setIsGallery(true);
    setIsStats(false);
    setIsBlog(false);
  };

  const handleBlogClick = () => {
    setIsUsers(false);
    setIsGallery(false);
    setIsBlog(true);
    setIsStats(false);
  };

  const handleStatsClick = () => {
    setIsUsers(false);
    setIsGallery(false);
    setIsBlog(false);
    setIsStats(true);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('api/stats/get');
        const statsData = await response.json();
        console.log(statsData);
  
        const statsArray = Object.entries(statsData).map(([key, value]) => ({ id: key, data: value }));
  
        setStats(statsArray); // Set the state to the array
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
  
    const fetchImages = async () => {
      try {
        const response = await fetch('api/images/get');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const imageData = await response.json();
        if (!Array.isArray(imageData)) {
          throw new Error('Invalid image data received');
        }
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
        // Optionally, handle the error by setting a default value for images or showing an error message to the user
        setImages([]); // Set images to an empty array or handle the error in another way
      }
    };
  
    fetchImages();
    fetchStats();
  }, []);


  const handleEditStat = async () => {
    if (!selectedStatId || !editedStat) return;
    
    try {
        const response = await fetch(`api/stats/put/${selectedStatId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: editedStat })
        });
        if (response.status === 200) {
            console.log('Stat updated successfully');

            setStats(prevStats => prevStats.map(stat => {
              if (stat.id === selectedStatId) {
                return { ...stat, data: editedStat };
              }
              return stat;
            }));

            handleCloseForm()
        } else {
            console.error('Failed to update stat');
        }
    } catch (error) {
        console.error('Error updating stat:', error);
    }
  }

const handleCloseForm = () => {
  setSelectedStatId(null);
  setEditedStat('');
};

const handleDeleteImage = async (filename) => {
  try {
    const response = await fetch(`api/images/${encodeURIComponent(filename)}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      console.log('Image deleted successfully');
      const newDeleteMessage =`Deleted ${filename} image successfully`;
      //setTimeout(() => setDeleteMessage(''), 4500); timeout to make messages disappear
      setDeleteMessages(prevMessages => [...prevMessages, newDeleteMessage]);
      setImages(prevImages => prevImages.filter(image => image.filename !== filename));//refresh the list of imgs
    } else {
      console.error('Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

  return (
    <>
      <Nav/>
        <div>
          <div>
            <button onClick={handleUsersClick} disabled={isUsers}>Users</button>
            <button onClick={handleGalleryClick} disabled={isGallery}>Gallery</button>
            <button onClick={handleBlogClick} disabled={isBlog}>Blog</button>
            <button onClick={handleStatsClick} disabled={isStats}>Stats</button>
          </div>

          {isUsers && <div>
            <p>Users Content</p>
          </div>}

          {isGallery && <div>
            <h1>Gallery Settings</h1>
            {deleteMessages.map((message, index) => (
              <p key={index} style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{message}</p>))}
                  <table>
                      <thead>
                          <tr>
                              <th>File Name</th>
                              <th>Preview</th>
                              <th>Date uploaded</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {images.map(image => (
                        <tr key={image.filename}>
                            <td>{image.filename}</td>
                            <td>
                                <img 
                                    src={`api/images/galleryImages/${encodeURIComponent(image.filename)}`} 
                                    alt={image.filename} 
                                    style={{ width: '200px', height: 'auto' }} 
                                    onLoad={() => console.log('Image loaded:', image.path)}
                                    onError={() => console.error('Error loading image:', image.path)}
                                />
                            </td>
                            <td>{new Date(image.dateOfCreation).toLocaleString()}</td>
                            <td>
                              <button onClick={() => handleDeleteImage(image.filename)}>DELETE</button> 
                            </td>
                        </tr>
                    ))}
                      </tbody>
                  </table>
                  
          </div>}

          {isBlog && <div>
            <p>Blog Content</p>
          </div>}

          {isStats && <div>
            <h1>Statistics</h1>
                  <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Data</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {stats.map(stat => (
                              <tr key={stat.id}>
                                  <td>{stat.id}</td>
                                  <td>{stat.data}</td>
                                  <td>
                                      <button onClick={() => setSelectedStatId(stat.id)}>Edit</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {selectedStatId && (
                      <div className="edit-form">
                          <h2>Edit Statistic {selectedStatId}</h2>
                          <input 
                              type="text" 
                              value={editedStat} 
                              onChange={(e) => setEditedStat(e.target.value)} 
                              placeholder="Enter new data" 
                          />
                          <button onClick={handleEditStat}>Save</button>
                          <button onClick={handleCloseForm}>Close</button> {/* Close button added */}
                      </div>
                  )}
          </div>}
        </div>
    </>
  );
  
};

export default Admin;
