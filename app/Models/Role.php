<?php

namespace Anglo\Models;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity
 * @table(name="roles")
 */
class Role
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @Column(type="string")
     */
    protected $name;

    /**
     * @ManyToMany(targetEntity="Permission", mappedBy="roles")
     */
    protected $permissions;

    /**
     * @OneToMany(targetEntity="User", mappedBy="role", fetch="EAGER")
     */
    protected $users;

    public function __construct()
    {
        $this->users = new ArrayCollection;
    }

    public function getUsers()
    {
        return $this->users;
    }

    public function getPermissions()
    {
        return $this->permissions;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }
}