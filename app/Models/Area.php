<?php


namespace Anglo\Models;

/**
 * @Entity @Table(name="areas")
 **/
class Area {
    
    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;

    /** @Column(type="string")**/
    protected $name;

    /**
     * @OneToMany(targetEntity="Village", mappedBy="area", fetch= "EAGER")
     */
    protected $villages;

    public function getID()
    {
        return $this->id;
    }
    public function getArea()
    {
        return $this->area;
    }

    public function getVillage()
    {
        return $this->village;
    }
}