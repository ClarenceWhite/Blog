package com.baizeyu.drafts.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "drafts")
public class Draft {

    @Id
    private String id;
    @Indexed(unique = true)
    private String title;
    private String content;
    private Date last_modified;
    private String category;


    public Draft(){}

    public Draft(String id, String title, String content, Date last_modified, String category){
        this.id = id;
        this.title = title;
        this.content = content;
        this.last_modified = last_modified;
        this.category = category;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getContent(){
        return content;
    }

    public void setContent(String content){
        this.content = content;
    }

    public Date getLast_modified(){
        return last_modified;
    }

    public void setLast_modified(Date last_modified){
        this.last_modified = last_modified;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }
}
