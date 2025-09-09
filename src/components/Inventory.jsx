'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../css/inventory.module.css';

const Inventory = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  // Enhanced inventory data with equipment images
  const inventoryData = [
    {
      id: 1,
      category: 'distillation',
      name: 'Copper Pot Stills',
      count: 8,
      unit: 'Units',
      capacity: '5,000L each',
      description: 'Premium copper pot stills crafted in Scotland for artisanal whiskey production with traditional techniques',
      icon: '🏺',
      status: 'operational',
      efficiency: '95%',
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-10-15',
      image: '/equipment/copper-pot-stills.jpg',
      specifications: [
        'Material: Pure Scottish Copper',
        'Heat Source: Steam Heated',
        'Temperature Control: Precision Digital',
        'Origin: Forsyths Scotland'
      ]
    },
    {
      id: 2,
      category: 'distillation',
      name: 'Column Stills',
      count: 4,
      unit: 'Units',
      capacity: '10,000L each',
      description: 'High-efficiency column stills with advanced rectification plates for continuous premium distillation',
      icon: '🏭',
      status: 'operational',
      efficiency: '98%',
      lastMaintenance: '2024-06-20',
      nextMaintenance: '2024-09-20',
      image: '/equipment/column-stills.jpg',
      specifications: [
        'Plates: 20 Bubble Cap Plates',
        'Material: Stainless Steel 316L',
        'Automation: PLC Controlled',
        'Efficiency: 98.5% Ethanol Recovery'
      ]
    },
    {
      id: 3,
      category: 'fermentation',
      name: 'Steel Fermentation Tanks',
      count: 12,
      unit: 'Units',
      capacity: '15,000L each',
      description: 'Temperature-controlled stainless steel fermentation vessels with glycol cooling systems',
      icon: '🛢️',
      status: 'operational',
      efficiency: '97%',
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-11-01',
      image: '/equipment/steel-fermentation-tanks.jpg',
      specifications: [
        'Cooling: Glycol Jacket System',
        'Material: Food Grade SS 316L',
        'Control: Digital Temperature Control',
        'Capacity: 15,000L Working Volume'
      ]
    },
    {
      id: 4,
      category: 'fermentation',
      name: 'Wooden Washbacks',
      count: 6,
      unit: 'Units',
      capacity: '8,000L each',
      description: 'Traditional Oregon pine washbacks for authentic flavor development and natural fermentation',
      icon: '🪣',
      status: 'operational',
      efficiency: '92%',
      lastMaintenance: '2024-07-10',
      nextMaintenance: '2024-10-10',
      image: '/equipment/wooden-washbacks.jpg',
      specifications: [
        'Material: Oregon Pine Wood',
        'Age: 15+ Years Seasoned',
        'Maintenance: Manual Cleaning',
        'Tradition: Scottish Heritage Design'
      ]
    },
    {
      id: 5,
      category: 'storage',
      name: 'Oak Aging Barrels',
      count: 2500,
      unit: 'Barrels',
      capacity: '200L each',
      description: 'Premium American and European oak barrels for spirit maturation and flavor development',
      icon: '🛢️',
      status: 'operational',
      efficiency: '100%',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2025-01-15',
      image: '/equipment/oak-aging-barrels.jpg',
      specifications: [
        'Oak Origin: American & European',
        'Char Level: Medium+ Char',
        'Capacity: 200L Standard',
        'Aging: 3-25 Years Program'
      ]
    },
    {
      id: 6,
      category: 'storage',
      name: 'Stainless Steel Storage Tanks',
      count: 20,
      unit: 'Tanks',
      capacity: '25,000L each',
      description: 'Large capacity stainless steel storage tanks for finished spirits with nitrogen blanketing',
      icon: '⚗️',
      status: 'operational',
      efficiency: '99%',
      lastMaintenance: '2024-05-30',
      nextMaintenance: '2024-08-30',
      image: '/equipment/steel-storage-tanks.jpg',
      specifications: [
        'Material: Stainless Steel 316L',
        'Protection: Nitrogen Blanketing',
        'Capacity: 25,000L Each',
        'Features: CIP System Integrated'
      ]
    },
    {
      id: 7,
      category: 'processing',
      name: 'Grain Milling Equipment',
      count: 3,
      unit: 'Mills',
      capacity: '2 tons/hour',
      description: 'High-precision grain milling and processing systems with dust collection and quality control',
      icon: '⚙️',
      status: 'operational',
      efficiency: '94%',
      lastMaintenance: '2024-07-25',
      nextMaintenance: '2024-10-25',
      image: '/equipment/grain-milling.jpg',
      specifications: [
        'Type: Hammer Mill System',
        'Capacity: 2 Tons/Hour',
        'Dust Control: Integrated System',
        'Quality: Uniform Particle Size'
      ]
    },
    {
      id: 8,
      category: 'processing',
      name: 'Copper Mash Tuns',
      count: 4,
      unit: 'Tuns',
      capacity: '12,000L each',
      description: 'Traditional copper-lined mash tuns for optimal sugar extraction and temperature control',
      icon: '🍯',
      status: 'operational',
      efficiency: '96%',
      lastMaintenance: '2024-06-15',
      nextMaintenance: '2024-09-15',
      image: '/equipment/copper-mash-tuns.jpg',
      specifications: [
        'Material: Copper Lined Interior',
        'Heating: Steam Jacket',
        'Mixing: Mechanical Rakes',
        'Efficiency: 96% Sugar Extraction'
      ]
    },
    {
      id: 9,
      category: 'quality',
      name: 'Quality Control Laboratory',
      count: 2,
      unit: 'Labs',
      capacity: 'Full Analysis Suite',
      description: 'State-of-the-art laboratories with advanced analytical equipment for comprehensive quality testing',
      icon: '🧪',
      status: 'operational',
      efficiency: '100%',
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      image: '/equipment/quality-lab.jpg',
      specifications: [
        'Equipment: GC-MS, HPLC Systems',
        'Testing: Chemical & Sensory',
        'Standards: ISO 17025 Certified',
        'Capacity: 200+ Samples/Day'
      ]
    },
    {
      id: 10,
      category: 'packaging',
      name: 'Automated Bottling Lines',
      count: 3,
      unit: 'Lines',
      capacity: '2,000 bottles/hour',
      description: 'Fully automated bottling, capping, labeling and packaging systems with quality inspection',
      icon: '🍾',
      status: 'operational',
      efficiency: '97%',
      lastMaintenance: '2024-07-05',
      nextMaintenance: '2024-10-05',
      image: '/equipment/bottling-lines.jpg',
      specifications: [
        'Speed: 2,000 Bottles/Hour',
        'Inspection: Vision System',
        'Packaging: Automated Boxing',
        'Quality: 99.9% Accuracy'
      ]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Equipment', icon: '📋', color: 'var(--rich-gold)' },
    { id: 'distillation', name: 'Distillation', icon: '🏺', color: 'var(--warm-bronze)' },
    { id: 'fermentation', name: 'Fermentation', icon: '🛢️', color: 'var(--rich-gold)' },
    { id: 'storage', name: 'Storage', icon: '⚗️', color: 'var(--warm-bronze)' },
    { id: 'processing', name: 'Processing', icon: '⚙️', color: 'var(--rich-gold)' },
    { id: 'quality', name: 'Quality Control', icon: '🧪', color: 'var(--warm-bronze)' },
    { id: 'packaging', name: 'Packaging', icon: '🍾', color: 'var(--rich-gold)' }
  ];

  // Summary statistics
  const summaryStats = [
    {
      label: 'Total Production Capacity',
      value: '2.5M',
      unit: 'Liters/Year',
      icon: '📈',
      color: 'var(--rich-gold)'
    },
    {
      label: 'Equipment Units',
      value: inventoryData.reduce((sum, item) => sum + item.count, 0).toLocaleString(),
      unit: 'Total Units',
      icon: '🏭',
      color: 'var(--warm-bronze)'
    },
    {
      label: 'Operational Efficiency',
      value: Math.round(inventoryData.reduce((sum, item) => sum + parseFloat(item.efficiency), 0) / inventoryData.length),
      unit: '% Average',
      icon: '⚡',
      color: 'var(--rich-gold)'
    },
    {
      label: 'Storage Capacity',
      value: '1.2M',
      unit: 'Liters',
      icon: '📦',
      color: 'var(--warm-bronze)'
    }
  ];

  // Filter inventory based on active category
  const filteredInventory = activeCategory === 'all' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === activeCategory);

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];
    
    itemsRef.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [filteredInventory]);

  // Mouse and scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Animated counters
  useEffect(() => {
    if (visibleItems.size > 0) {
      const timer = setTimeout(() => {
        const newCounters = {};
        filteredInventory.forEach((item, index) => {
          if (visibleItems.has(index)) {
            let currentCount = 0;
            const targetCount = item.count;
            const increment = Math.max(1, Math.ceil(targetCount / 50));
            
            const countAnimation = setInterval(() => {
              currentCount += increment;
              if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(countAnimation);
              }
              newCounters[item.id] = currentCount;
              setCounters(prev => ({ ...prev, [item.id]: currentCount }));
            }, 30);
          }
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [visibleItems, filteredInventory]);

  const parallaxOffset = Math.min(scrollY * 0.2, 150);
  const mouseParallaxX = mousePosition.x * 10;
  const mouseParallaxY = mousePosition.y * 8;

  return (
    <section className={styles.inventorySection} ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.backgroundLayer}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.1}px, ${parallaxOffset * 0.3}px, 0)`
          }}
        />
        <div 
          className={styles.particleField}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.5}px, 0)`
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i}
              className={styles.particle}
              style={{
                '--delay': `${i * 0.4}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerContent}>
            <div className={styles.badge}>Manufacturing Excellence</div>
            
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleMain}>Production</span>
              <span className={styles.titleSub}>Inventory</span>
            </h2>
            
            <div className={styles.titleDecoration}>
              <div className={styles.decorLine}></div>
              <div className={styles.decorOrb}>
                <div className={styles.orbCore}></div>
              </div>
              <div className={styles.decorLine}></div>
            </div>
            
            <p className={styles.sectionDescription}>
              State-of-the-art equipment and facilities that power our premium spirits production, 
              from grain to glass with uncompromising quality standards.
            </p>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className={styles.summarySection}>
          <div className={styles.summaryGrid}>
            {summaryStats.map((stat, index) => (
              <div 
                key={index}
                className={styles.summaryCard}
                style={{ '--stat-delay': `${index * 0.1}s` }}
              >
                <div className={styles.statIcon} style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statUnit}>{stat.unit}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
                <div className={styles.statGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.categoryFilters}>
          <div className={styles.filtersGrid}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ 
                  '--filter-delay': `${index * 0.05}s`,
                  '--category-color': category.color
                }}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
                <div className={styles.categoryGlow}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Grid */}
        <div className={styles.inventoryGrid}>
          {filteredInventory.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className={`${styles.inventoryCard} ${visibleItems.has(index) ? styles.visible : ''}`}
              style={{ '--card-delay': `${index * 0.1}s` }}
            >
              {/* Equipment Image */}
              <div className={styles.equipmentImageContainer}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={250}
                  className={styles.equipmentImage}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.viewDetailsButton}
                       onClick={() => setSelectedEquipment(item)}>
                    <span>View Details</span>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.imageGlow}></div>
              </div>

              <div className={styles.cardHeader}>
                <div className={styles.equipmentIcon}>{item.icon}</div>
                <div className={styles.statusIndicator}>
                  <div className={`${styles.statusDot} ${styles[item.status]}`}></div>
                  <span className={styles.statusText}>
                    {item.status === 'operational' ? 'Operational' : 'Maintenance'}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.equipmentName}>{item.name}</h3>
                <p className={styles.equipmentDescription}>{item.description}</p>

                <div className={styles.equipmentStats}>
                  <div className={styles.primaryStat}>
                    <div className={styles.statNumber}>
                      {counters[item.id] || 0}
                    </div>
                    <div className={styles.statLabel}>{item.unit}</div>
                  </div>
                  
                  <div className={styles.secondaryStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Capacity</span>
                      <span className={styles.statValue}>{item.capacity}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Efficiency</span>
                      <span className={styles.statValue}>{item.efficiency}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.maintenanceInfo}>
                  <div className={styles.maintenanceItem}>
                    <span className={styles.maintenanceLabel}>Last Service</span>
                    <span className={styles.maintenanceDate}>{item.lastMaintenance}</span>
                  </div>
                  <div className={styles.maintenanceItem}>
                    <span className={styles.maintenanceLabel}>Next Service</span>
                    <span className={styles.maintenanceDate}>{item.nextMaintenance}</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Details Modal */}
      {selectedEquipment && (
        <div className={styles.modal} onClick={() => setSelectedEquipment(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedEquipment(null)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <div className={styles.modalImage}>
              <Image
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                width={600}
                height={400}
                className={styles.modalEquipmentImage}
              />
            </div>
            
            <div className={styles.modalDetails}>
              <h3>{selectedEquipment.name}</h3>
              <p className={styles.modalDescription}>{selectedEquipment.description}</p>
              
              <div className={styles.modalSpecs}>
                <h4>Technical Specifications</h4>
                <ul>
                  {selectedEquipment.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.modalStats}>
                <div className={styles.modalStat}>
                  <span className={styles.modalStatLabel}>Units</span>
                  <span className={styles.modalStatValue}>{selectedEquipment.count}</span>
                </div>
                <div className={styles.modalStat}>
                  <span className={styles.modalStatLabel}>Capacity</span>
                  <span className={styles.modalStatValue}>{selectedEquipment.capacity}</span>
                </div>
                <div className={styles.modalStat}>
                  <span className={styles.modalStatLabel}>Efficiency</span>
                  <span className={styles.modalStatValue}>{selectedEquipment.efficiency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Inventory;
