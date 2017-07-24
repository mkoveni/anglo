<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="villages")
 **/
class Village{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;

    /** @Column(type="string")**/
    protected $name;

    /**
     * @ManyToOne(targetEntity="Area", inversedBy="villages", fetch="EAGER")
     * @JoinColumn(name="area_id", referencedColumnName="id")
     */
    protected $area;

    /**
     * @ManyOneToMany(targetEntity="Questionnaire", mappedBy="villages", fetch="EAGER")
     */
    protected $questionnaires;

    public function getId()
    {
        return $this->id;
    }

    public function getVillage()
    {
        return $this->village;
    }

    public function getArea()
    {
        return $this->area;
    }

    public function getQuestionnaire()
    {
        return $this->questionnaire;
    }
}