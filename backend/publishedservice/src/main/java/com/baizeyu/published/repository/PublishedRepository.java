package com.baizeyu.published.repository;

import com.baizeyu.published.model.Published;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;


public interface PublishedRepository extends MongoRepository<Published, String> {

    Published getPublishedByTitle(String title);

    List<Published> findAllByCategory(String category);

    void deletePublishedByTitle(String title);
}
