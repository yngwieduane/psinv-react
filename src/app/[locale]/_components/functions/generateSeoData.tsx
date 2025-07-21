export function generateSeoData(pData:any) {
    let seoUrl, seoTitle, seoDescription, seoKeyword;
  
    // Helper function to sanitize the URL
    const sanitizeTitle = (str:any) => str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  
    if (!pData) return {};
  
    if (!isNaN(pData.bedrooms) && Number(pData.bedrooms) > 0) {
      // If it's a numeric bedroom count
      seoUrl = sanitizeTitle(`${pData.bedrooms} bedroom ${pData.propertyType} for ${pData.adType} ${pData.name} ${pData.community} ${pData.code}`);
      seoTitle = `${pData.seoStart} ${pData.propertyType} ${pData.bedrooms} bedrooms ${pData.name} ${pData.community} ${pData.refNo}`;
      seoDescription = `${pData.seoStart} ${pData.propertyType} ${pData.bedrooms} bedrooms ${pData.name} ${pData.community} ${pData.emirate} (pictures - images - floor plan - location map - prices) ${pData.refNo}`;
      seoKeyword = `${pData.seoStart} ${pData.propertyType} ${pData.bedrooms} bedrooms ${pData.name} ${pData.community} ${pData.emirate} (pictures - images - floor plan - location map - prices) ${pData.refNo}`;
    } else if (pData.bedrooms === "studio") {
      // If it's a studio
      seoUrl = sanitizeTitle(`studio ${pData.propertyType} for ${pData.adType} ${pData.name} ${pData.community} ${pData.code}`);
      seoTitle = `${pData.seoStart} ${pData.propertyType} studio ${pData.name} ${pData.community} ${pData.refNo}`;
      seoDescription = `${pData.seoStart} ${pData.propertyType} studio ${pData.name} ${pData.community} ${pData.emirate} (pictures - images - floor plan - location map - prices) ${pData.refNo}`;
      seoKeyword = `${pData.seoStart} ${pData.propertyType} studio ${pData.name} ${pData.community} ${pData.emirate} (images - floor plan - location map - prices) ${pData.refNo}`;
    } else {
      // Default case (No bedrooms)
      seoUrl = sanitizeTitle(`${pData.propertyType} for ${pData.adType} ${pData.name} ${pData.community} ${pData.code}`);
      seoTitle = `${pData.seoStart} ${pData.propertyType} ${pData.name} ${pData.community} ${pData.refNo}`;
      seoDescription = `${pData.seoStart} ${pData.propertyType} ${pData.name} ${pData.community} ${pData.emirate} (pictures - images - floor plan - location map - prices) ${pData.refNo}`;
      seoKeyword = `${pData.seoStart} ${pData.propertyType} ${pData.name} ${pData.community} ${pData.emirate} (pictures - images - floor plan - location map - prices) ${pData.refNo}`;
    }
  
    return {
      seoUrl,
      seoTitle: seoTitle.replace(/\b\w/g, (char) => char.toUpperCase()), // ucwords equivalent
      seoDescription: seoDescription.replace(/\b\w/g, (char) => char.toUpperCase()),
      seoKeyword: seoKeyword.replace(/\b\w/g, (char) => char.toUpperCase()),
    };
  }