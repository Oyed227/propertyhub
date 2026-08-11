
export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560184897-e9b1b3f59c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-259329608606?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600017071810-0f8d6b6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490423436-8a7d6b3b3f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];


export const getFallbackImage = (id) => {
  let seed = 0;
  if (typeof id === "number") {
    seed = id;
  } else if (id != null) {
    const str = String(id);
    for (let i = 0; i < str.length; i++) {
      seed += str.charCodeAt(i);
    }
  }
  return FALLBACK_IMAGES[Math.abs(seed) % FALLBACK_IMAGES.length];
};



export const getPropertyImage = (property) => {
  if (property?.images && property.images.length > 0) {
    return property.images[0];
  }
  if (property?.image) {
    return property.image;
  }
  return getFallbackImage(property?._id || property?.id);
};
