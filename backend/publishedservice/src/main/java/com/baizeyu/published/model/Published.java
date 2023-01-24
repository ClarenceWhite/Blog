package com.baizeyu.published.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "published")
public class Published {

    @Id
    private String id;
    @Indexed(unique = true)
    private String title;
    private String content;
    private Date publish_date;
    private String category;

    public Published(String id, String title, String content, Date publish_date, String category){
        this.id = id;
        this.title = title;
        this.content = content;
        this.publish_date = publish_date;
        this.category = category;
    }

    public Published() {}

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

    public Date getPublish_date(){
        return publish_date;
    }

    public void setPublish_date(Date publish_date){
        this.publish_date = publish_date;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }
}
