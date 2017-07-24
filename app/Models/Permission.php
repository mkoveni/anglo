<?php

namespace Anglo\Models;

/**
 * @Entity
 * @Table(name="permissions")
 */
class Permission
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue(strategy="IDENTITY")
     * @var [type]
     */
    protected $id;

    /**
     * @Column(type="string")
     * @var [string]
     */
    protected $name;

    /**
     * @ManyToMany(targetEntity="Role", inversedBy="permissions")
     * @JoinTable(name="role_permissions")
     */
    protected $roles;

    public function getRoles()
    {
        return $this->roles;
    }
}