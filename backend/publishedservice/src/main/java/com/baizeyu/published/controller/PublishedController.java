package com.baizeyu.published.controller;

import com.baizeyu.published.model.Published;
import com.baizeyu.published.service.PublishedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
public class PublishedController {

    @Autowired
    PublishedService publishedService;

    @RequestMapping(value = "/api/publish", method = RequestMethod.GET)
    public ResponseEntity<?> getAllPublished(){
        try{
            Map<String, Date> all_published = publishedService.getAllPublished();
            return new ResponseEntity<>(all_published, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/publish/{title}", method = RequestMethod.GET)
    public ResponseEntity<?> getPublishedByTitle(@PathVariable String title){
        try{
            Published found = publishedService.getPublishedByTitle(title);
            return new ResponseEntity<>(found, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/publish/category/{category}", method = RequestMethod.GET)
    public ResponseEntity<?> getPublishedByCategory(@PathVariable String category){
        try{
            Map<String, Date> found = publishedService.getPublishedByCategory(category);
            return new ResponseEntity<>(found, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/publish", method = RequestMethod.POST)
    public ResponseEntity<?> publishArticle(@RequestBody Published article){
        try{
            Map<String, Date> all = publishedService.getAllPublished();
            Set<String> all_titles = all.keySet();
            if (all_titles.contains(article.getTitle())) {
                return new ResponseEntity<>("Title duplicated!", HttpStatus.BAD_REQUEST);
            } else {
                System.out.println("Publishing article: " + article.getTitle());
                publishedService.publishArticle(article);
                return new ResponseEntity<>("Article published successfully!", HttpStatus.OK);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/publish/{old_title}", method = RequestMethod.PUT)
    public ResponseEntity<?> republishArticle(@RequestBody Published newArticle, @PathVariable String old_title){
        try{
            if (publishedService.updateArticle(newArticle, old_title)) {
                System.out.println("Valid new article, updating...");
                return new ResponseEntity<>("Article updated and published ", HttpStatus.OK);
            } else {
                System.out.println("Title of new article has conflict with others'...");
                return new ResponseEntity<>("New title conflict!", HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/publish/{title}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteArticle(@PathVariable String title){
        try{
            System.out.println("Deleting article: " + title);
            if (publishedService.deleteArticle(title)) {
                return new ResponseEntity<>("Article deleted successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Article doesn't exist!", HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
