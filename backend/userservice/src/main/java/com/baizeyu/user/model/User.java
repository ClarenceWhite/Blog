package com.baizeyu.user.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user", schema = "blog_user")
public class User{

    @Id
    private String username;
    private String password;
    private String role;

    public String getRole(){
        return role;
    }

    public void setRole(String role){
        this.role = role;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
